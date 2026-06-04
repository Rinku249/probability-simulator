
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

var simulations = (probabilities, names, n, target) =>{
    lcm = LCM(probabilities, probabilities.length);
    slots = probabilities.map(x => lcm/x);

    results = Array();
    gottenAt = Array();
    finished = Array();
    underTarget = 0;

    for(let i = 0 ; i < n; i++)
    {
        results.push(slots.map(x => 0));
        gottenAt.push(Array());
        counter = 0;
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
                if(results[i][winner] == 0) gottenAt[i][winner] = counter;
                results[i][winner] += 1;
                if(!results[i].some(x => x == 0))
                {
                    finished.push(counter);
                    break;
                } 
            }
        }
        if(counter <= target) underTarget++;
    }



    min = Infinity;
    max = -Infinity;
    for(let i = 0 ; i < finished.length ; i++ )
    {
        if (finished[i] < min) min = finished[i];
        if (finished[i] > max) max = finished[i];
    }

    average = finished.reduce((sum, x) => sum + x, 0)/n

    console.log("In " + n+ " generations the results were: \n\t The minimum number of attempts was: " + min + 
        "\n\t The maximum number of attempts was: " + max + "\n\t The average number of attempts was: " + average + 
        "\n\t In the end " + (underTarget/n * 100) + "% of simulations were under target"
    )

    for(let i = 0; i < slots.length; i++)
    {
        averageNitem = 0
        averageDupes = 0
        for(let j = 0 ; j < gottenAt.length; j++)
        {
            averageNitem += gottenAt[j][i];
            averageDupes += results[j][i];
        }
        averageNitem /= n;
        averageDupes /= n;
        console.log("\t Average number of attempts to get " + names[i] + ": " +averageNitem + 
            " Gotten an average of " + averageDupes + " times");
    }

    return;
};

simulations([800,400,50,50], ["pet", "enhanced seed", "armour seed", "weapon seed"], 100000, 400);
