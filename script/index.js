const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all").then(res => res.json()).then(json => displayLessons(json.data))
};
const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
     fetch(url).then(res => res.json()).then(jsonData=>  displayLevelWord(jsonData.data))
}


// {id: 71, level: 1, word: 'Apple', meaning: 'আপেল', pronunciation: 'অ্যাপল'}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    words.forEach(word => {
        console.log(word);

        const card = document.createElement("div");
        card.innerHTML = `
                <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-semibold">Meaning / Pronounciation</p>

            <div class="text-2xl font-medium font-bangla">"${word.meaning} / ${word.pronunciation}"</div>
            <div class="flex justify-between items-center">
                <button class="detail btn bg-[#1a91ff10] hover:bg-[#1a91ff80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="volume btn bg-[#1a91ff10] hover:bg-[#1a91ff80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordContainer.append(card)
    });

}

const displayLessons = (lessons) => {
    console.log(lessons);

    // 1: get the container and empty
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = "";


    //2: get into every lesson
    for (let lesson of lessons) {
        // 3: create element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
                <button onclick="loadLevelWord(${lesson.level_no})" href="" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}</button>
        `;

        console.log(lesson)
        //4: append to the container 
        levelContainer.append(btnDiv)
        
    }
    
}
    
loadLessons()