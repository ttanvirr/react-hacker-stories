import * as React from "react"

// const welcome = {
//     greeting: "Hey",
//     title: "React",
// }

function getTitle(title) {
    return title
}

function App() {
    return (
        <div>
            <h1>Hello {getTitle("React")}!</h1>
            <label htmlFor='search'>Search:</label>
            <input type='text' name='search' id='search' />
        </div>
    )
}

export default App
