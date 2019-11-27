import { addEntry } from "../../../state"

export function FileInput() {
    function onChange(event) {
        for (let index = 0; index < event.target.files.length; index++) {
            const f = event.target.files[index];
            const reader = new FileReader();
            reader.onload = function(e) {
                addEntry({
                    name: f.name,
                    size: f.size,
                    content: e.target.result,
                });
            };
            reader.readAsText(f);
        }
    }

    return (
        <div id="file-upload">
            <input type="file" multiple name="dbalti" onChange={onChange}/>
        </div>
    );
}