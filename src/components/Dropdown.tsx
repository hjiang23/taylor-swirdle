import Downshift from 'downshift';
import data from '../data.json';

function Dropdown(props: any) {
  
  let items = data;
  
  interface Track {
    track_name: string;
    album_name: string;
  }

  const noGuesses = (name: string) =>  {
    for (let i = 0; i < props.table.length; i++) {
      if (props.table[i].track_name.track_name === name) {
        return false;
      }
    }
    return true;
  }

  const placeholderText = () => {
    if (!props.gameOver) {
      return "Guess " + props.guessNum + " of 7";
    }
    else if (props.won) {
      return "You solved it in " + props.guessNum + "!";
    }
    else {
      return "Better luck next time!";
    }
  }

  return (
    <Downshift
      onChange={selection =>
        {
          props.handleGuess(selection.track_name);
          props.setClear("");
        }
      }
      inputValue = {props.clear}
      onInputValueChange={val => props.setClear(val)}
      itemToString={() => ('')}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        getToggleButtonProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
      }) => (
        <div>
          <div className="w-72 flex flex-col gap-1">
            <div
              className="flex shadow-sm bg-white gap-0.5"
              {...getRootProps({}, {suppressRefError: true})}
            >
              <input
                placeholder= {placeholderText()}
                className="w-full p-1.5"
                disabled = {props.gameOver}
                {...getInputProps()}
              />
            </div>
          </div>
          <ul
            className={`absolute w-72 bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 ${
              !(isOpen && items.length) && 'hidden'
            }`}
            {...getMenuProps()}
          >
            {isOpen
              ? items
                  .filter(
                    (item: Track) =>
                      (!inputValue ||
                      item.track_name
                        .toLowerCase()
                        .includes(inputValue.toLowerCase()) ||
                      item.album_name
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())) &&
                      noGuesses(item.track_name),
                  )
                  .map((item: any, index: any) => (
                    <li
                      className={`
                        ${highlightedIndex === index && 'bg-blue-300'}
                        py-2 px-3 shadow-sm flex flex-col`
                      }
                      {...getItemProps({
                        key: item.track_name,
                        index,
                        item,
                      })}
                    >
                      <span>{item.track_name}</span>
                      <span className="text-sm text-gray-700">
                        {item.album_name}
                      </span>
                    </li>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  )
}

export default Dropdown;
