import * as React from "react"
// const welcome = {
//     greeting: "Hey",
//     title: "React",
// }

// function getTitle(title) {
//     return title
// }

// const title = "Hello React!"

// CUSTOM HOOK
const useStorageState = (key, initialState) => {
    const [value, setValue] = React.useState(
        localStorage.getItem(key) ?? initialState,
    )
    React.useEffect(() => {
        localStorage.setItem(key, value)
    }, [key, value])

    return [value, setValue]
}

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

    const [searchTerm, setSearchTerm] = useStorageState("search", "React")

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    const searchedStories = stories.filter((story) => {
        return story.title.toLowerCase().includes(searchTerm.toLowerCase())
    })

    return (
        <div>
            <h1>My Hacker Stories</h1>

            <InputWithLabel
                id='search'
                label='Search'
                value={searchTerm}
                onInputChange={handleSearch}
            />

            <hr />

            <List list={searchedStories} />
        </div>
    )
}

const InputWithLabel = ({ id, label, type = "text", value, onInputChange }) => {
    // console.log("Input renders")

    const handleChange = (event) => {
        onInputChange(event)
    }

    return (
        <div>
            <label htmlFor={id}>{label}:</label>
            &nbsp;
            <input type={type} id={id} value={value} onChange={handleChange} />
        </div>
    )
}

const List = ({ list }) => {
    // console.log(props);
    console.log("List renders")

    return (
        <ul>
            {list.map(({ objectID, ...item }) => {
                return <Item key={objectID} {...item} />
            })}
        </ul>
    )
}

const Item = ({ title, url, author, num_comments, points, objectID }) => {
    console.log("Item renders")

    return (
        <li key={objectID}>
            <span>
                <a href={url}>{title}</a>
            </span>
            <span>{author}</span>
            <span>{points}</span>
            <span>{num_comments}</span>
        </li>
    )
}

export default App
