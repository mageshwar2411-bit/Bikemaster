const bikeKnowledge = [
    {
        keywords: ["ducati"],
        response: "Ducati represents the pinnacle of Italian passion and performance. Famous models include the Panigale V4, Multistrada, and the iconic Monster. They are known for their desmodromic valve systems and stunning designs."
    },
    {
        keywords: ["kawasaki", "ninja"],
        response: "Kawasaki is legendary for power. The Ninja H2 is currently one of the fastest production motorcycles. Their 'Z' line offers incredible naked performance, and the Ninja 400 is a favorite for beginners."
    },
    {
        keywords: ["honda", "cbr"],
        response: "Honda is synonymous with reliability and engineering precision. From the CB650R naked bike to the Africa Twin adventurer and the Fireblade CBR1000RR-R, they have a bike for every rider."
    },
    {
        keywords: ["yamaha", "r1", "r6", "mt"],
        response: "Yamaha's 'Master of Torque' (MT) series and 'R' series (R1, R7) are world-class. They emphasize rider feel and surgical handling. The MT-07 and MT-09 are currently among the top-selling nakeds."
    },
    {
        keywords: ["maintenance", "service", "oil", "chain"],
        response: "Regular maintenance is key. You should: 1. Check tire pressure weekly. 2. Clean and lube your chain every 500-800km. 3. Change oil according to manual (usually 5k-10k km). 4. Check brake pads and fluid levels regularly."
    },
    {
        keywords: ["safety", "gear", "helmet", "jacket"],
        response: "Safety first! Always wear: 1. An ECE/SNELL certified helmet. 2. Abrasion-resistant jacket with armor. 3. Moto-specific gloves. 4. Kevlar or armored pants. 5. Reinforced riding boots. Dress for the slide, not the ride!"
    },
    {
        keywords: ["types", "category", "classes"],
        response: "Main categories: 1. Sport (Fast, fairings). 2. Naked/Street (Upright, exposed engine). 3. Adventure/ADV (Off-road capable). 4. Cruiser (Low seat, relaxed). 5. Touring (Comfort for long distance)."
    },
    {
        keywords: ["ktm", "duke"],
        response: "KTM is known for their 'Ready to Race' philosophy. Their Dukes (390, 890, 1290) are famous for being light, flickable, and punchy. They also dominate the Dakar Rally."
    },
    {
        keywords: ["bmw", "gs"],
        response: "BMW is the king of adventure with the R 1250 GS (and the new R 1300 GS). They also produce the S 1000 RR, which redefined the superbike class with its advanced electronics."
    },
];

const defaultResponses = [
    "That's a great question about bikes! Could you be more specific? Ask about brands like Ducati, Kawasaki, or about maintenance.",
    "I'm still learning the torque curves, but I can help with brand info, gear, or bike types. Try asking 'What are the types of bikes?'",
    "Ride on! I didn't quite catch that. Want to talk about BMW, Honda, or safety gear?"
];

document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const typingIndicator = document.getElementById('typingIndicator');
    const resetChat = document.getElementById('resetChat');

    function appendMessage(text, isUser = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'msg-content';
        contentDiv.textContent = text;
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'msg-time';
        const now = new Date();
        timeDiv.textContent = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
        
        msgDiv.appendChild(contentDiv);
        msgDiv.appendChild(timeDiv);
        
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
    }

    function getResponse(query) {
        const lowerQuery = query.toLowerCase();
        for (const item of bikeKnowledge) {
            if (item.keywords.some(keyword => lowerQuery.includes(keyword))) {
                return item.response;
            }
        }
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    async function handleSend() {
        const text = userInput.value.trim();
        if (!text) return;

        appendMessage(text, true);
        userInput.value = '';
        
        // Show typing
        typingIndicator.style.display = 'flex';
        chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });

        // Simulate thinking delay
        setTimeout(() => {
            typingIndicator.style.display = 'none';
            const response = getResponse(text);
            appendMessage(response, false);
        }, 1200);
    }

    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    resetChat.addEventListener('click', () => {
        chatMessages.innerHTML = `
            <div class="message bot-message">
                <div class="msg-content">
                    History cleared. Ready for your next bike-related question! 🏍️
                </div>
                <div class="msg-time">Just Now</div>
            </div>
        `;
    });

    userInput.focus();
});
