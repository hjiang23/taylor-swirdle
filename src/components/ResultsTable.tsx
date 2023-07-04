function ResultsTable(props: any) {

    const guesses = props.table.map((row: any) => (<GuessRow contents = {row}/>))

    return (
        <table className = "table-auto" >
            <thead>
                <tr>
                    <th>Track</th><th>First Letter</th><th>Album</th><th>Track No.</th><th>Features</th><th>Bonus/FTV</th><th>Duration</th>
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
    
    return (
        <tr>
            <td style={{backgroundColor: contents.track_name.correctness === 2 ? "#37be75" : ""}}>{contents.track_name.track_name}</td>
            <td style={{backgroundColor: contents.first_letter.correctness === 2 ? "#37be75" : contents.first_letter.correctness === 1 ? "#eadd65" : ""}}>{((contents.first_letter.direction === 1) ? contents.first_letter.letter + " →" : (contents.first_letter.direction === -1) ? "← " + contents.first_letter.letter : contents.first_letter.letter)}</td>
            <td style={{backgroundColor: contents.album.correctness === 2 ? "#37be75" : contents.album.correctness === 1 ? "#eadd65" : ""}}>{contents.album.album}</td>
            <td style={{backgroundColor: contents.track_number.correctness === 2 ? "#37be75" : contents.track_number.correctness === 1 ? "#eadd65" : ""}}>{contents.track_number.track_number + " " + ((contents.track_number.direction === 1) ? "↑" : (contents.track_number.direction === -1) ? "↓": "")}</td>
            <td style={{backgroundColor: contents.ft.correctness === 2 ? "#37be75" : contents.ft.correctness === 1 ? "#eadd65" : ""}}>{contents.ft.featuring}</td>
            <td style={{backgroundColor: contents.bonus.correctness === 2 ? "#37be75" : contents.bonus.correctness === 1 ? "#eadd65" : ""}}>{contents.bonus.bonus}</td>
            <td style={{backgroundColor: contents.duration.correctness === 2 ? "#37be75" : contents.duration.correctness === 1 ? "#eadd65" :""}}>{contents.duration.duration + " " + ((contents.duration.direction === 1) ? "↑" : (contents.duration.direction === -1) ? "↓": "")}</td>
        </tr>
    );
}

export default ResultsTable;