const ARTWORK_SIZE = 32;
const music_data = fetch("./data/musics.json")
      .then((response) => response.json())
      .catch((e) => console.error(e));

const e = React.createElement;

function App(props) {
    children = [];
    for(i = 0; i < music_data.length(); i++) {
        const m = music_data[i];
        children.push(e(
            Music,
            {
                title: m.title,
                art: m.art,
                file: m.file
            }
        ));
    }

    return e(
        "div",
        {},
        e(
            "h1",
            { id: "title" },
            "ProdByBS"
        ),
        children
    );
}

function Music(props) {
    return e(
        "div",
        { class: "music" },
        e(
            MusicInfo,
            {
                title: props.title,
                art: props.art
            },
            null
        ),
        e(
            MusicPlayer,
            {
                file: props.file
            },
            null
        )
    )
}

function MusicPlayer(props) {
    const [playing, setIsPlaying] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const audio = React.useRef(null);

    const handlePlayButton = () => {
        console.log("Playing!");
        setIsPlaying(true);

    }

    const handleAudioProgress = (event) => {
        console.log(audio.current.currentTime);
        setProgress(audio.current.currentTime);
    }

    React.useEffect(() => {
        if(playing) {
            audio.current = new Audio(props.file)
            audio.current.play();
            audio.current.addEventListener("timeupdate", handleAudioProgress);
            return () => audio.current.pause();
        }
    }, [playing]);

    return e(
        "div",
        { class: "music_player" },
        e(
            MusicPlayerPlayButton,
            {
                playing: playing,
                onClick: handlePlayButton
            },
            null
        ),
        e(
            MusicPlayerProgressBar,
            {
                progress: progress,
                max: (audio.current == null ? 0 : audio.current.duration)
            },
            null
        )
    );
}

function MusicPlayerPlayButton(props) {
    return e("button", { class: "music_player_button", onClick: props.onClick }, "Play!");
}

function MusicInfo(props) {
    return e(
        "div",
        { class: "music_info" },
        e(
            "img",
            {
                src: props.art,
                width: ARTWORK_SIZE,
                height: ARTWORK_SIZE
            },
            null
        ),
        e(
            "p",
            {},
            props.title
        )
    );
}

function MusicPlayerProgressBar(props) {
    return e(
        "div",
        { class: "music_player_progress" },
        e(
            "input",
            {
                type: "range",
                name: "progress_bar",
                min: "0",
                max: props.max,
                value: props.progress,
                step: 1,
                class: "progressBar"
            },
            null
        ),
        e(
            "label",
            {
                for: "progress_bar"
            },
            `${sec_to_min(props.progress)}/${sec_to_min(props.max)}`
        )
    );
}

function sec_to_min(sec) {
    return `${Math.floor(sec/60)}:${pad(Math.trunc(sec % 60))}`
}

function pad(num) {
    return (num < 10) ? '0' + num.toString() : num.toString();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App, {}, null));
