'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'maxSubarray' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function maxSubarray(inarr) {
    // Write your code here
    /*
    
        a b c d e
        i
        j
        
    */
    // first reduce all strings of positive numbers and negative numbers 
    // to a single number for that run which is the sum of that run
    let arr = inarr
        .reduce((a,e,i,ar)=>{
            if(e==0) // if there is zero, remove it.
                return a;
            if((e<0 && a.last>0) || (e>0 && a.last<0)){ // sign change since last 
                a.ar.push(a.s);
                a.s = e;
            }else{
                a.s += e;              
            }
            a.last = e;
            return a;
        },{ar:[],s:0,last:0});
    arr.ar.push(arr.s);
    arr = arr.ar;

    let ra = [];
    let rlmax = arr[0];
    for(let i=0; i<arr.length; ++i){
        let rlmaxin = arr[i];
        let sum = arr[i];
        for(let j=i+1; j<arr.length; ++j){
            sum += arr[j];
            if(sum>rlmaxin) rlmaxin = sum;
        }
        if(rlmaxin>rlmax) rlmax = rlmaxin;
    }
    ra.push(rlmax);
    
    
    
    
    let r2; // dangerous... but I am in a hurry
    let r2max = Math.max(...inarr);
    if( r2max <= 0 ) { // if the max is negative then the largest sum by either method is the largetst number
        r2 = r2max;   // todo: re-order things.  Do this max test first. 
        ra.pop();
        ra.push(r2);
        ra.push(r2);

    }
    else {
        r2 = inarr
            .slice()
            .filter( e => e>0)
            .reduce((a,e)=> a+e,0);
        ra.push(r2);
    }
    return ra;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = maxSubarray(arr);

        ws.write(result.join(' ') + '\n');
    }

    ws.end();
}
