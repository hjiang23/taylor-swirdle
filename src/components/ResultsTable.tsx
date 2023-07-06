function ResultsTable(props: any) {

    const guesses = props.table.map((row: any) => (<GuessRow contents = {row} colors = {props.colors}/>))

    return (
        <table className = "text-xs mx-auto sm:w-4/5" >
            <thead>
                <tr>
                    <th className = "w-auto">TRACK</th>
                    <th className = "w-20">ALBUM</th>
                    <th className = "w-20">FIRST LETTER</th>
                    <th className = "w-20">TITLE LENGTH</th>
                    <th className = "w-20">TRACK NUM</th>
                    <th className = "w-20">DUR</th>
                </tr>
            </thead>
            <tbody>
                {guesses}
            </tbody>
        </table>
    );
}

function GuessRow(props: any) {
    
    const contents = props.contents;
    const colors = props.colors;

    const getColor = (correctness: number) => {
        return correctness === 2 ? colors[2] : correctness === 1 ? colors[1] : colors[0];
    }

    const getArrow = (isLetter: boolean, direction: number) => {
        if (isLetter) {
            return direction === 1 ? "→" : direction === -1 ? "←" : "";
        }
        return direction === 1 ? "↑" : direction === -1 ? "↓" : "";
    }
    
    return (
        <tr className = "h-20">
            <td className = "h-full"><Tile color = {getColor(contents.track_name.correctness)} str = {contents.track_name.track_name} arrow = {getArrow(false, 0)}/></td>
            <td className = "h-full"><Tile color = {getColor(contents.album.correctness)} str = {contents.album.album} arrow = {getArrow(false, 0)}/></td>
            <td className = "h-full"><Tile color = {getColor(contents.first_letter.correctness)} str = {contents.first_letter.letter} arrow = {getArrow(true, contents.first_letter.direction)}/></td>
            <td className = "h-full"><Tile color = {getColor(contents.length.correctness)} str = {contents.length.length} arrow = {getArrow(false, contents.length.direction)}/></td>
            <td className = "h-full"><Tile color = {getColor(contents.track_number.correctness)} str = {contents.track_number.track_number} arrow = {getArrow(false, contents.track_number.direction)}/></td>
            <td className = "h-full"><Tile color = {getColor(contents.duration.correctness)} str = {contents.duration.duration} arrow = {getArrow(false, contents.duration.direction)}/></td> 
        </tr>
    );
}

function Tile(props: any) {

    const color = "bg-[" + props.color + "]";
    const str = props.str;
    const arrow = props.arrow;

    return (
        <div className = {color + " h-full flex flex-col justify-center"}>
            <p>{str}</p>
            <p>{arrow}</p>
        </div>
    )
}

export default ResultsTable;