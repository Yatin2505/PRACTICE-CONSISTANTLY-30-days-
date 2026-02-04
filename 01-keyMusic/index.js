const emojiMap = {
    65: ["😳","🛸","👀"],        
    83: ["🤯","😵‍💫","🧠"],     
    68: ["😂","🤣","😆"],       
    70: ["💔","😭","😫"],       
    71: ["❌","⚠️","💥"],       
    72: ["✨","🔔","🫧"],       
    74: ["🥊","💥","😤"],       
    75: ["😈","🤡","🙃"],       
    76: ["✨","💫","🌟"]        
};


window.addEventListener('keydown',function (e) {

    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)

    if(!audio)return;

    audio.currentTime=0
    audio.play();

    key.classList.add("playing");

    showEmoji(e.keyCode, key);

})

function showEmoji(code, keyEl){

    if(!emojiMap[code] || !keyEl) return;

    const rect = keyEl.getBoundingClientRect();

    const emoji = document.createElement("span");
    emoji.className = "emoji-pop";

    const list = emojiMap[code];
    emoji.textContent = list[Math.floor(Math.random() * list.length)];

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    emoji.style.setProperty("--x", x + "px");
    emoji.style.setProperty("--y", y + "px");

    document.body.appendChild(emoji);

    emoji.addEventListener("animationend", () => {
        emoji.remove();
    });
    emoji.style.setProperty("--spread", (Math.random()*120 - 60) + "px");

}


const keys = document.querySelectorAll('.key[data-key]');

keys.forEach(k => {
    k.addEventListener('transitionend', () => {
        k.classList.remove('playing');
    });
});

const hint = document.getElementById("hint");

window.addEventListener("keydown", (e) => {

    const letter = e.key.toUpperCase();

    if("ASDFGHJKL".includes(letter)){
        hint.textContent = "Playing : " + letter;
    }
});
