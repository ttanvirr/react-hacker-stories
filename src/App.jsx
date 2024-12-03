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
                isFocused
                onInputChange={handleSearch}>
                <strong>Search: </strong>
            </InputWithLabel>

            <hr />

            <List list={searchedStories} />
        </div>
    )
}

const InputWithLabel = ({
    id,
    value,
    type = "text",
    onInputChange,
    isFocused,
    children,
}) => {
    // console.log("Input renders")

    const inputRef = React.useRef()

    React.useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isFocused])

    return (
        <>
            <label htmlFor={id}>{children}:</label>
            &nbsp;
            <input
                id={id}
                type={type}
                value={value}
                ref={inputRef}
                onChange={onInputChange}
            />
        </>
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
