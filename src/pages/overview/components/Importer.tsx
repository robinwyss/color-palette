import React from 'react';
import { useHistory } from "react-router-dom";
import { importFromJson } from '../../../lib/Export/JsonExporter';
import { saveScheme } from '../../../lib/LocalStorage';



const Importer: React.FunctionComponent = () => {
    const history = useHistory();

    const readJsonFile = (files: FileList | null) => {
        if (files) {
            const file = files[0]
            const reader = new FileReader()
            reader.onload = async (e) => {
                if (e && e.target && e.target.result) {
                    const scheme = importFromJson(e.target.result as string);
                    if (scheme) {
                        saveScheme(scheme);
                        history.push("/scheme/" + scheme.id);
                    }
                }
            }
            reader.readAsText(file)
        }
    }

    return (
        <div>
            <div>Import</div>
            <input type="file" onChange={e => readJsonFile(e.target.files)} />
        </div>
    );

}

export default Importer;