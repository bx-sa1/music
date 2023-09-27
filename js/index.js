function MusicPlayer(file) {
    const [playing, setIsPlaying] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [audio, setAudio] = React.useState(null);
    const [duration, setDuration] = React.useState(0);

    function handlePlayButton() {
        setIsPlaying(true);
    }

    function handleAudioProgress(event) {
        setProgress(audio.currentTime);
    }

    React.useEffect(() => {
        if(playing) {
            setAudio(new Audio({file}))
            audio.play();
            audio.ontimeupdate(handleAudioProgress)
            setDuration(audio.duration);
            return () => audio.pause();
        }
    }, [playing]);

    return React.createElement("div", {}, 
        React.createElement(MusicPlayerArt, {}, null),
        React.createElement(MusicPlayerPlayButton, { onclick: handlePlayButton, playing: playing}, null),
        React.createElement(MusicPlayerProgressBar, { progress: progress, max: duration }, null))
}

function MusicPlayerPlayButton(onclick, playing) {
    return React.createElement("button", { onclick: {onclick} }, "Play!");
}

function MusicPlayerArt() {

}

function MusicPlayerProgressBar(progress, max) {
    return React.createElement("div", {}, 
        React.createElement("input", { type: "range", name: "progress_bar", min: "0", max: {max}, value: {progress}, step: 1, class: "progressBar" }, 
        React.createElement("label", { for: "progress_bar" }, '${sec_to_min(progress)}/${sec_to_min(max)}'))
    );
}

function sec_to_min(sec) {
    return `${Math.floor(sec/60)}:${sec % 60}`
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(MusicPlayer));