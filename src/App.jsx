import * as React from "react"
// const welcome = {
//     greeting: "Hey",
//     title: "React",
// }

// function getTitle(title) {
//     return title
// }

// const title = "Hello React!"

const App = () => {
    console.log("App renders")

    const stories = [
        {
            title: "React",
            url: "https://reactjs.org/",
            author: "Jordan Walke",
            num_comments: 3,
            points: 4,
            objectID: 0,
        },
        {
            title: "Redux",
            url: "https://redux.js.org/",
            author: "Dan Abramov, Andrew Clark",
            num_comments: 2,
            points: 5,
            objectID: 1,
        },
    ]

    const [searchTerm, setSearchTerm] = React.useState("")

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    const searchedStories = stories.filter((story) => {
        return story.title.toLowerCase().includes(searchTerm.toLowerCase())
    })

    return (
        <div>
            <h1>My Hacker Stories</h1>

            <Search onSearch={handleSearch} />

            <hr />

            <List list={searchedStories} />
        </div>
    )
}

const Search = (props) => {
    console.log("Search renders")

    const handleChange = (event) => {
        props.onSearch(event)
    }

    return (
        <div>
            <label htmlFor='search'>Search:</label>
            <input
                type='text'
                name='search'
                id='search'
                onChange={handleChange}
            />

            <p>Searching for: {props.searchedStories}</p>
        </div>
    )
}

const List = (props) => {
    // console.log(props);
    console.log("List renders")

    return (
        <ul>
            {props.list.map((item) => {
                return <Item key={item.objectID} item={item} />
            })}
        </ul>
    )
}

const Item = (props) => {
    console.log("Item renders")

    return (
        <li key={props.item.objectID}>
            <span>
                <a href={props.item.url}>{props.item.title}</a>
            </span>
            <span>{props.item.author}</span>
            <span>{props.item.points}</span>
            <span>{props.item.num_comments}</span>
        </li>
    )
}

export default App
