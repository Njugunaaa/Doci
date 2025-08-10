// Medical AI service using Hugging Face API
export class MedicalAI {
  private static readonly HF_API_KEY = "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";
  private static readonly API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";

  static async getHealthAdvice(question: string): Promise<string> {
    if (!question.trim()) {
      throw new Error("Question is required");
    }

    const prompt = `
You are MedCare AI, a helpful and knowledgeable assistant that provides **general, safe medical advice**.

Rules you must follow:
1. Be polite, empathetic, and clear in your responses.
2. Provide **accurate and responsible** health information based on widely accepted medical guidelines.
3. Never diagnose specific diseases or prescribe medications.
4. If symptoms are serious, urgent, or persistent, always advise the user to see a licensed healthcare provider immediately.
5. Format responses in **clear, short paragraphs** so they are easy to read.
6. At the end of every response, include this exact disclaimer:
   "⚠ This is AI-generated advice and is not a substitute for professional medical consultation."

User Question: ${question}
`;

    try {
      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          inputs: prompt,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
            top_p: 0.9,
            do_sample: true
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Extract the generated text and clean it up
      let generatedText = data[0]?.generated_text || "I'm sorry, I couldn't generate a response at the moment. Please try again.";
      
      // Remove the original prompt from the response if it's included
      if (generatedText.includes(prompt)) {
        generatedText = generatedText.replace(prompt, '').trim();
      }

      // If the response is too short or doesn't contain the disclaimer, provide a fallback
      if (generatedText.length < 50 || !generatedText.includes("⚠")) {
        return this.getFallbackResponse(question);
      }

      return generatedText;
    } catch (error) {
      console.error("Error calling Hugging Face API:", error);
      return this.getFallbackResponse(question);
    }
  }

  private static getFallbackResponse(question: string): string {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('headache') || lowerQuestion.includes('head pain')) {
      return `I understand you're experiencing headaches. Here are some general recommendations:

**Immediate relief measures:**
• Rest in a quiet, dark room
• Apply a cold or warm compress to your head or neck
• Stay well hydrated
• Consider gentle neck and shoulder stretches

**When to seek medical attention:**
• Sudden, severe headache unlike any you've had before
• Headache with fever, stiff neck, confusion, or vision changes
• Headaches that worsen or become more frequent
• Headache after a head injury

**General prevention:**
• Maintain regular sleep schedule
• Stay hydrated
• Manage stress levels
• Limit screen time

⚠ This is AI-generated advice and is not a substitute for professional medical consultation.`;
    }
    
    if (lowerQuestion.includes('fever') || lowerQuestion.includes('temperature')) {
      return `Fever is your body's natural response to fighting infection. Here's what you should know:

**General care for fever:**
• Rest and stay hydrated with water, clear broths, or electrolyte solutions
• Dress in lightweight clothing
• Use a cool, damp cloth on your forehead
• Monitor temperature regularly

**When to seek immediate medical care:**
• Temperature above 103°F (39.4°C) in adults
• Fever lasting more than 3 days
• Difficulty breathing or chest pain
• Severe headache, stiff neck, or confusion
• Persistent vomiting or signs of dehydration

**For children:** Contact a pediatrician for guidance, especially for infants under 3 months.

⚠ This is AI-generated advice and is not a substitute for professional medical consultation.`;
    }

    // Default response
    return `Thank you for your health question. While I'd like to provide specific guidance, I recommend consulting with a healthcare professional who can properly evaluate your symptoms and medical history.

**General health tips:**
• Maintain a balanced diet and stay hydrated
• Get adequate sleep (7-9 hours for adults)
• Exercise regularly as appropriate for your condition
• Manage stress through relaxation techniques
• Follow up with your healthcare provider for ongoing concerns

**When to seek immediate medical attention:**
• Severe or worsening symptoms
• Difficulty breathing or chest pain
• High fever or signs of serious illness
• Any symptoms that concern you

⚠ This is AI-generated advice and is not a substitute for professional medical consultation.`;
  }
}