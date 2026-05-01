/**
 * STLAccess Voice Manager
 * Handles SpeechRecognition and command parsing for Scale Engine and Reference Library.
 */
class VoiceManager {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.targetInputId = null;
        this.init();
    }

    init() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn("Speech Recognition API not supported in this browser.");
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';

        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateUIState(true);
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.updateUIState(false);
        };

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log("Voice Transcript:", transcript);
            this.handleCommand(transcript);
        };

        this.recognition.onerror = (event) => {
            console.error("Speech Recognition Error:", event.error);
            this.updateUIState(false);
        };
    }

    toggleListening(targetId = null) {
        if (!this.recognition) return;
        this.targetInputId = targetId;

        if (this.isListening) {
            this.recognition.stop();
        } else {
            this.recognition.start();
        }
    }

    updateUIState(listening) {
        const btns = document.querySelectorAll('.mic-btn');
        btns.forEach(btn => {
            if (listening) {
                btn.classList.add('listening');
                btn.querySelector('i').className = 'fa-solid fa-microphone-lines animate-pulse text-[#ff6b35]';
            } else {
                btn.classList.remove('listening');
                btn.querySelector('i').className = 'fa-solid fa-microphone text-slate-500';
            }
        });
    }

    handleCommand(transcript) {
        // 1. Library Search Logic - Auto-detect if on library/reference page
        const librarySearchInput = document.getElementById('librarySearch');
        if (this.targetInputId === 'librarySearch' || (this.targetInputId === null && librarySearchInput)) {
            if (librarySearchInput) {
                librarySearchInput.value = transcript;
                // Trigger the filter function (assumed to be global)
                if (typeof filterTable === 'function') filterTable();
            }
            return;
        }

        // 2. Engine Command Logic (e.g., "Scale 28 to 32" or "from 1 35 to 32mm")
        if (document.getElementById('sourceScale')) {
            this.parseEngineCommand(transcript);
        }
    }

    parseEngineCommand(transcript) {
        const sourceSelect = document.getElementById('sourceScale');
        const targetSelect = document.getElementById('targetScale');
        if (!sourceSelect || !targetSelect) return;

        // Common scales mapping for fuzzy matching
        const scaleMap = {
            "twenty eight": "28mm",
            "thirty two": "32mm",
            "thirty-two": "32mm",
            "thirty five": "35mm",
            "forty": "40mm",
            "seventy five": "75mm",
            "1 to 35": "1:35",
            "1 35": "1:35",
            "1 to 56": "1:56",
            "1 56": "1:56",
            "1 to 72": "1:72",
            "1 72": "1:72",
            "1 to 48": "1:48",
            "1 48": "1:48",
            "quarter scale": "1:48",
            "military scale": "1:35"
        };

        // Try to find source and target in the transcript
        let foundSource = null;
        let foundTarget = null;

        // Check for specific phrases first
        Object.keys(scaleMap).forEach(phrase => {
            if (transcript.includes(phrase)) {
                // If it contains "to" or "into", try to split
                const parts = transcript.split(/ to | into | 2 /);
                if (parts.length > 1) {
                    if (parts[0].includes(phrase)) foundSource = scaleMap[phrase];
                    if (parts[1].includes(phrase)) foundTarget = scaleMap[phrase];
                } else {
                    // Just a single scale mentioned
                    foundSource = scaleMap[phrase];
                }
            }
        });

        // fallback to exact value matching
        const allScales = ["28mm", "32mm", "35mm", "40mm", "75mm", "1:35", "1:56", "1:72", "1:48", "1:100"];
        allScales.forEach(s => {
            if (transcript.includes(s.replace(':', ' '))) {
                 const parts = transcript.split(/ to | into | 2 /);
                 if (parts.length > 1) {
                    if (parts[0].includes(s.replace(':', ' '))) foundSource = s;
                    if (parts[1].includes(s.replace(':', ' '))) foundTarget = s;
                 } else {
                    foundSource = s;
                 }
            }
        });

        if (foundSource) sourceSelect.value = foundSource;
        if (foundTarget) targetSelect.value = foundTarget;

        // Trigger calculation (assumed to be global)
        if (typeof calculate === 'function') calculate();
    }
}

// Initialize on load
window.voiceManager = new VoiceManager();
