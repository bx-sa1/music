function MusicPlayer(file) {
    const [playing, setIsPlaying] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [audio, setAudio] = React.useState(null);

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
            return () => audio.pause();
        }
    }, [playing]);

    return React.createElement("div", {}, 
        React.createElement(MusicPlayerArt, {}, null),
        React.createElement(MusicPlayerPlayButton, { onclick: handlePlayButton, playing: playing}, null),
        React.createElement(MusicPlayerProgressBar, { progress: progress, max: audio.duration }, null))
}

function MusicPlayerPlayButton(onclick, playing) {
    return React.createElement("button", { onclick: {onclick} }, "Play!");
}

function MusicPlayerArt() {

}

function MusicPlayerProgressBar(progress, max) {
    return React.createElement("input", { type: "range", min: "0", max: {max}, class: "progressBar" }, null);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(MusicPlayer));