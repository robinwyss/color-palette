import React from 'react';
import ReactDOM from 'react-dom';
import { parseColors } from './ColorUtils'

it('parses colors correctly', () => {
    let colors = parseColors("#FFFFFF\n#000000\n#F90AD3")
    expect(colors).toStrictEqual(["#FFFFFF", "#000000", "#F90AD3"]);

    let colors2 = parseColors("#ffA089,#000000,#999999")
    expect(colors2).toStrictEqual(["#FFA089", "#000000", "#999999"]);

    let colors3 = parseColors("#abcdef#010304#111111")
    expect(colors3).toStrictEqual(["#ABCDEF", "#010304", "#111111"]);
});

it('ignores incorrect colors', () => {
    let colors = parseColors("#FFFFF\n#00000,#M90AD3 #AA BB CC")
    expect(colors).toStrictEqual([]);
});

it('ignores incorrect colors but keeps the correct ones', () => {
    let colors = parseColors("#FFFFF\n#000000,#M90AD3 #AABBCC;#ABD 091")
    expect(colors).toStrictEqual(["#000000", "#AABBCC"]);
});