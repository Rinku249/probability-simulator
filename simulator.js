
var gcd = (a, b) =>
{ 
    if (b == 0) 
        return a; 
    return gcd(b, a % b); 
};

// Returns LCM of array elements 
var LCM = (arr, n) =>
{ 
    // Initialize result 
    let ans = arr[0]; 

    // ans contains LCM of arr[0], ..arr[i] 
    // after i'th iteration, 
    for (let i = 1; i < n; i++) 
        ans = (((arr[i] * ans)) / 
                (gcd(arr[i], ans))); 

    return ans; 
};

var simulations = (probabilities, names, n) =>{
    lcm = LCM(probabilities, probabilities.length);
    slots = probabilities.map(x => lcm/x);

    results = Array();
    gottenAt = Array();
    finished = Array();
    dupes = Array();

    for(let i = 0 ; i < n; i++)
    {
        results.push(slots.map(x => false));
        gottenAt.push(Array());
        counter = 0;
        dupeCounter = 0;
        while(true)
        {
            counter++;
            roll = Math.floor(Math.random() * lcm);
            //console.log("at counter: " + counter + ", the random number was: " + roll)
            winner = -1;
            current = 0;
            for(let j = 0 ; j< slots.length ; j++)
            {
                if(roll < current + slots[j])
                {
                    winner = j;
                    break;
                } 
                else 
                {
                    current += slots[j];
                }
            }
            if(winner >= 0)
            {
                if(results[i][winner])
                {
                    dupeCounter++;
                    continue;
                }
                results[i][winner] = true;
                //TODO - implement a way to know which item was gotten in what order
                gottenAt[i].push(Array(winner, counter));
                if(!results[i].some(x => !x))
                {
                    finished.push(counter);
                    break;
                } 
            }
        }
        dupes.push(dupeCounter);
    }



    min = Infinity;
    max = -Infinity;
    for(let i = 0 ; i < finished.length ; i++ )
    {
        if (finished[i] < min) min = finished[i];
        if (finished[i] > max) max = finished[i];
    }

    average = finished.reduce((sum, x) => sum + x, 0)/n
    averageDupes = dupes.reduce((sum, x) => sum + x, 0)/n



    console.log("In " + n+ " generations the results were: \n\t The minimum value was: " + min + 
        "\n\t The maximum value was: " + max + "\n\t The average value was: " + average + "\n\t the average number of dupes was: " +
        averageDupes
    )

    for(let i = 0; i < slots.length; i++)
    {
        averageNitem = gottenAt.reduce((sum,x) => sum + x[i][1], 0)/n
        console.log("\t Average number of attempts to get item " + (i+1) + ": " +averageNitem);
    }

    return;
};

simulations([800, 50, 50, 400], Array(), 1000000);
