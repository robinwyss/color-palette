import React from 'react';
import ReactDOM from 'react-dom';
import { colorValid } from './ColorUtils'

it('parses colors correctly', () => {
    let colors = colorValid("#FFFFFF\n#000000\n#F90AD3")
    expect(colors).toStrictEqual(["#FFFFFF", "#000000", "#F90AD3"]);

    let colors2 = colorValid("#ffA089,#000000,#999999")
    expect(colors2).toStrictEqual(["#FFA089", "#000000", "#999999"]);

    let colors3 = colorValid("#abcdef#010304#111111")
    expect(colors3).toStrictEqual(["#ABCDEF", "#010304", "#111111"]);
});

it('ignores incorrect colors', () => {
    let colors = colorValid("#FFFFF\n#00000,#M90AD3 #AA BB CC")
    expect(colors).toStrictEqual([]);
});

it('ignores incorrect colors but keeps the correct ones', () => {
    let colors = colorValid("#FFFFF\n#000000,#M90AD3 #AABBCC;#ABD 091")
    expect(colors).toStrictEqual(["#000000", "#AABBCC"]);
});