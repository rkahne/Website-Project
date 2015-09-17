var getSubreddits = function(searchTerm){
    var r;
    var subreddits = [];
    var uniqueSubreddits = [];
    var uniqueSubredditsCount = [];
    var subredditObjects = [];
    var sortedSubredditObjects = [];
    var htmlString = "<ul>";
    var request = $.getJSON('https://www.reddit.com/search.json?q=%22'+searchTerm+'%22&count=1000&limit=1000');
    r=request.responseJSON.data.children;
    for(i = 0; i<r.length; i++){
        subreddits.push(r[i].data.subreddit);
    }
    uniqueSubreddits = _.uniq(subreddits);
    for(i=0;i<uniqueSubreddits.length;i++){
        uniqueSubredditsCount[i]=0;
        for(j=0;j<subreddits.length;j++){
            if(uniqueSubreddits[i]==subreddits[j]){
                uniqueSubredditsCount[i]++;
            }
        } //end 'j' for loop
        subredditObjects.push({
            name: uniqueSubreddits[i],
            count: uniqueSubredditsCount[i]
        }); // end Object array push
    } // end 'i' for loop
    sortedSubredditObjects = _.sortBy(subredditObjects,'count').reverse();
    for(i = 0; i<sortedSubredditObjects.length; i++){
        htmlString+="<li>"+sortedSubredditObjects[i].name+": "+sortedSubredditObjects[i].count+"</li>";
    }
    htmlString+="</ul>"  
    return htmlString;;  
};
$("document").ready(function(){   
    $(".container").html(getSubreddits("Rifle+Paper+Company"));
}); //end ready