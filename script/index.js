const createElements = (arr) => {
    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`);
    return (htmlElements.join(" "));
}

const manageSpinner = (status) => {  
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");    
    } else {
        document.getElementById("word-container").classList.remove("hidden");  
        document.getElementById("spinner").classList.add("hidden");
    }
}


const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all").then(res => res.json()).then(json => displayLessons(json.data))
};


const displayLessons = (lessons) => {
    // console.log(lessons);

    // 1: get the container and empty
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = "";


    //2: get into every lesson
    for (let lesson of lessons) {
        // 3: create element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
                <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" href="" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}</button>
        `;

        // console.log(lesson)

        //4: append to the container 
        levelContainer.append(btnDiv)
        
    }
    
}
    
loadLessons();

const removeActive = ()=> {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    // console.log(lessonButtons);
    lessonButtons.forEach(btn => btn.classList.remove("active"));

}

const loadLevelWord = (id) => {
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url).then(res => res.json()).then(jsonData => {
         removeActive(); //reomve active class

        const clickBtn = document.getElementById(`lesson-btn-${id}`);

        clickBtn.classList.add("active") //add active class

         displayLevelWord(jsonData.data)
     })
}

const loadWordDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    // console.log(url);
    const res =await fetch(url);
    const details = await res.json();
    displayWordDetail(details.data)
}

// {word: 'Eager', meaning: 'আগ্রহী', pronunciation: 'ইগার', level: 1, sentence: 'The kids were eager to open their gifts.', …}
// id :  5
// level :  1
// meaning : "আগ্রহী"
// partsOfSpeech :  "adjective"
// points :  1
// pronunciation :  "ইগার"
// sentence :  "The kids were eager to open their gifts."
// synonyms :  (3) ['enthusiastic', 'excited', 'keen']
// word :  "Eager"

const displayWordDetail = (detail) => {
    console.log(detail);
    const detailsBox = document.getElementById("detail-container");
    detailsBox.innerHTML = `
        <div>
            <h2 class="text-2xl font-bold">${detail.word} (<i class="fa-solid fa-microphone-lines"></i>     : ${detail.pronunciation})</h2> 
        </div>
        <div>
            <h2 class="font-bold">Meaning</h2>
            <p>${detail.meaning}</p>
        </div>
        <div>
            <h2 class="font-bold">Example</h2>
            <p>${detail.sentence}</p>
        </div>
        <div>
            <h2 class="font-bold">Synonyms</h2>
            <div class="">${createElements(detail.synonyms)}</div>
        </div>
    `
    document.getElementById("word_modal").showModal()
}


// {id: 71, level: 1, word: 'Apple', meaning: 'আপেল', pronunciation: 'অ্যাপল'}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
         <div class="text-center  col-span-full rounded-xl py-10 space-y-6 font-bangla">
         <img class="mx-auto" src="./assets/alert-error.png" />
            <p class="text-xl font-medium text-gray-400 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-2xl md:text-4xl 
            font-bold">নেক্সট Lesson এ যান</h2>
        </div>
        `;

        manageSpinner(false)
        return;
    }

    words.forEach(word => {
        // console.log(word);

        const card = document.createElement("div");
        card.innerHTML = `
                <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning / Pronounciation</p>

            <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning: "অর্থ পাওয়া যায়নি"} / ${word.pronunciation? word.pronunciation: "pronounciation পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="detail btn bg-[#1a91ff10] hover:bg-[#1a91ff80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="volume btn bg-[#1a91ff10] hover:bg-[#1a91ff80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        manageSpinner(false)
        wordContainer.append(card)
    });

}

document.getElementById("btn-search").addEventListener("click", () => {
    const searchInput = document.getElementById("input-search");
    const searchValue = searchInput.value.trim().toLowerCase();
    console.log(searchValue);

    fetch("https://openapi.programming-hero.com/api/words/all").then(res => res.json()).then(data => {
        const allWord = data.data;
        console.log(allWord);
        const filterWords = allWord.filter(word => word.word.toLowerCase().includes(searchValue));
        console.log(filterWords);
        displayLevelWord(filterWords);
    })
})
