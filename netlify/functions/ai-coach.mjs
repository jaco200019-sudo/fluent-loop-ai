const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json; charset=utf-8"
};

const fallbackModel = "gpt-4.1-mini";

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return json(501, {
      error: "OPENAI_API_KEY is not configured",
      mode: "fallback"
    });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON body" });
  }

  if (payload.action === "health") {
    return json(200, {
      mode: "ai",
      model: process.env.OPENAI_MODEL || fallbackModel
    });
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || fallbackModel,
      input: buildPrompt(payload),
      text: {
        format: responseFormatFor(payload.action || "chat")
      }
    })
  });

  const data = await response.json();
  if (!response.ok) {
    return json(response.status, {
      error: data.error?.message || "OpenAI request failed",
      mode: "fallback"
    });
  }

  const text = extractOutputText(data);
  const parsed = parseJson(text);
  if (!parsed) {
    return json(502, {
      error: "AI returned non-JSON output",
      raw: text,
      mode: "fallback"
    });
  }

  return json(200, parsed);
}

function buildPrompt(payload) {
  const action = payload.action || "chat";

  if (action === "ability_method") {
    return [
      "You are FluentLoop, a warm AI English coach for Chinese-speaking beginners.",
      "Given the user's level, goal, daily minutes, and test score, return JSON only.",
      "Schema: {\"method\":\"Chinese learning method in one sentence\",\"level\":\"A2|B1|B2\",\"focus_words\":[\"word\"],\"daily_plan\":[\"short Chinese task\"]}.",
      "Make the method encouraging, practical, and focused on high-frequency English.",
      JSON.stringify(payload)
    ].join("\n");
  }

  if (action === "word_bank") {
    return [
      "You are FluentLoop's AI vocabulary planner.",
      "Return JSON only.",
      "Schema: {\"words\":[{\"word\":\"string\",\"meaning\":\"Chinese meaning\",\"rank\":number,\"usage\":\"percentage string\",\"example\":\"English sentence\",\"exampleCn\":\"Chinese translation\",\"reason\":\"Chinese reason\"}]}",
      "Choose high-frequency words useful for the user's goal and current level. Prefer words beginners can use immediately.",
      JSON.stringify(payload)
    ].join("\n");
  }

  if (action === "chat") {
    const context = payload.scenarioContext || {};
    return [
      "You are FluentLoop, a friendly English conversation coach for Chinese-speaking beginners.",
      "You must role-play ONLY the current scene and current role. Never switch scenes.",
      `Current scene: ${context.label || payload.scenario || "unknown"}.`,
      `Your role: ${context.role || "conversation partner"}.`,
      `Learner task: ${context.learnerTask || "practice a short English conversation"}.`,
      `Opening line: ${context.openingLine || ""}`,
      `Helpful target phrases: ${(context.suggestedPhrases || []).join(" | ")}`,
      `Forbidden off-scene topics: ${(context.forbiddenTopics || []).join(" | ")}`,
      "If the learner types unclear text, do not answer a random topic. Ask a short in-scene clarification question and suggest one natural phrase.",
      "If the learner input looks like random letters, keyboard mashing, pinyin, or not understandable English, do not continue the order/interview/meeting as if it was clear.",
      "For unclear input, reply with reassurance and one exact phrase the learner can copy. The correction must say in Chinese that the input was not clear English.",
      "For a coffee/barista scene, replies must be about ordering drinks, size, milk, hot/iced, for here/to go, payment, or pickup name.",
      "For a travel/station scene, replies must be about routes, platforms, time, tickets, directions, or transportation.",
      "For an interview scene, replies must be about experience, examples, strengths, role details, or work style.",
      "For a meeting scene, replies must be about updates, blockers, timeline, follow-up, risks, or support.",
      "For a restaurant scene, replies must be about menus, recommendations, ordering, drinks, allergies, spice level, bills, or payment.",
      "For a hotel scene, replies must be about reservations, check-in, passport/ID, room, key card, breakfast, elevator, or check-out.",
      "For a shopping scene, replies must be about price, size, color, sale, bag, receipt, return, card, or cash.",
      "For a taxi scene, replies must be about destination, address, route, traffic, arrival time, payment, or drop-off point.",
      "For a doctor scene, replies must be about symptoms, duration, fever, cough, medicine, allergies, rest, or follow-up care.",
      "For an apartment/rental scene, replies must be about viewing, rent, deposit, utilities, lease, move-in date, laundry, or building details.",
      "For a bank scene, replies must be about accounts, ID, fees, transfers, statements, cards, checking, or savings.",
      "For a delivery/return scene, replies must be about packages, order numbers, return labels, refunds, pickup, receipts, or delays.",
      "For an appointment scene, replies must be about scheduling, availability, rescheduling, name, phone number, confirmation, or arrival time.",
      "For an emergency/help scene, replies must be about safety, location, police, medical help, lost items, documents, or staying on the line.",
      "For a social small-talk scene, replies must be about introductions, day, work, hobbies, weekends, where someone lives, or keeping conversation going.",
      "Return JSON only.",
      "Schema: {\"reply\":\"English reply\",\"replyCn\":\"Chinese translation\",\"correction\":\"Chinese correction tip\",\"review_cards\":[{\"phrase\":\"English phrase\",\"meaning\":\"Chinese meaning\",\"example\":\"English example\",\"exampleCn\":\"Chinese translation\"}],\"next_words\":[\"word\"]}.",
      "Keep reply under 22 English words. Keep correction in Chinese and focused on one useful improvement.",
      JSON.stringify(payload)
    ].join("\n");
  }

  return [
    "You are FluentLoop, a friendly English conversation coach for Chinese-speaking beginners.",
    "The user is practicing spoken English. Keep the conversation short, safe, confidence-building, and useful.",
    "Return JSON only.",
    "Schema: {\"reply\":\"English reply\",\"replyCn\":\"Chinese translation\",\"correction\":\"Chinese correction tip\",\"review_cards\":[{\"phrase\":\"English phrase\",\"meaning\":\"Chinese meaning\",\"example\":\"English example\",\"exampleCn\":\"Chinese translation\"}],\"next_words\":[\"word\"]}.",
    "Do not overcorrect. Praise effort, then suggest one more natural phrase.",
    JSON.stringify(payload)
  ].join("\n");
}

function responseFormatFor(action) {
  if (action === "ability_method") {
    return {
      type: "json_schema",
      name: "ability_method",
      strict: true,
      schema: {
        type: "object",
        additionalProperties: false,
        required: ["method", "level", "focus_words", "daily_plan"],
        properties: {
          method: { type: "string" },
          level: { type: "string", enum: ["A2", "B1", "B2"] },
          focus_words: {
            type: "array",
            items: { type: "string" },
            minItems: 3,
            maxItems: 8
          },
          daily_plan: {
            type: "array",
            items: { type: "string" },
            minItems: 2,
            maxItems: 5
          }
        }
      }
    };
  }

  if (action === "word_bank") {
    return {
      type: "json_schema",
      name: "word_bank",
      strict: true,
      schema: {
        type: "object",
        additionalProperties: false,
        required: ["words"],
        properties: {
          words: {
            type: "array",
            minItems: 6,
            maxItems: 9,
            items: {
              type: "object",
              additionalProperties: false,
              required: ["word", "meaning", "rank", "usage", "example", "exampleCn", "reason"],
              properties: {
                word: { type: "string" },
                meaning: { type: "string" },
                rank: { type: "integer" },
                usage: { type: "string" },
                example: { type: "string" },
                exampleCn: { type: "string" },
                reason: { type: "string" }
              }
            }
          }
        }
      }
    };
  }

  return {
    type: "json_schema",
    name: "chat_coach",
    strict: true,
    schema: {
      type: "object",
      additionalProperties: false,
      required: ["reply", "replyCn", "correction", "review_cards", "next_words"],
      properties: {
        reply: { type: "string" },
        replyCn: { type: "string" },
        correction: { type: "string" },
        review_cards: {
          type: "array",
          minItems: 1,
          maxItems: 3,
          items: {
            type: "object",
            additionalProperties: false,
            required: ["phrase", "meaning", "example", "exampleCn"],
            properties: {
              phrase: { type: "string" },
              meaning: { type: "string" },
              example: { type: "string" },
              exampleCn: { type: "string" }
            }
          }
        },
        next_words: {
          type: "array",
          items: { type: "string" },
          minItems: 1,
          maxItems: 5
        }
      }
    }
  };
}

function extractOutputText(data) {
  if (typeof data.output_text === "string") return data.output_text;
  const chunks = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === "string") chunks.push(content.text);
      if (typeof content.output_text === "string") chunks.push(content.output_text);
    }
  }
  return chunks.join("\n").trim();
}

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

function json(statusCode, body) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(body)
  };
}
