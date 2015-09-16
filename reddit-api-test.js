//var getSubreddits = function(searchTerm){
var addSubReddits = function(searchText){  
    var r;
    var subreddits = [];
    var uniqueSubreddits = [];
    var uniqueSubredditsCount = [];
    var subredditObjects = [];
    var sortedSubredditObjects = [];
    var htmlString = "<div class=panel-body><ul class=list-group>";
    var searchTerm=searchText;
    var qString = {
        q:searchTerm,
        count: 1000,
        limit: 1000
        };      
    $.get('https://www.reddit.com/search.json',qString).success(function(responseData){
        r=responseData.data.children;
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
            htmlString+="<a href=http://www.reddit.com/r/"+sortedSubredditObjects[i].name+" class=list-group-item><span class=badge>"+sortedSubredditObjects[i].count+"</span>"+sortedSubredditObjects[i].name+"</a>";
        }
        htmlString+="</ul></div>"
        $(".subredditList").html(htmlString);  
    }); // end AJAX callback.
}; // end function
var addPosts = function(searchText){  
    var r;
    var postTitle = [];
    var postLink = [];
    var score = [];
    var postObjects = [];
    var sortedPostObjects = [];
    var htmlString = "<div class=panel-body><ul class=list-group>";
    var searchTerm=searchText;
    var qString = {
        q:searchTerm,
        count: 1000,
        limit: 1000
        };      
    $.get('https://www.reddit.com/search.json',qString).success(function(responseData){
        r=responseData.data.children;
        for(i = 0; i<r.length; i++){
            postTitle.push(r[i].data.title);
            postLink.push(r[i].data.url);
            score.push(r[i].data.score)
        }
        for(i=0;i<postTitle.length;i++){
            postObjects.push({
                title: postTitle[i],
                score: score[i],
                link: postLink[i]
            }); // end Object array push
        } // end 'i' for loop
        sortedPostObjects = _.sortBy(postObjects,'score').reverse();
        for(i = 0; i<sortedPostObjects.length; i++){
            htmlString+="<a href="+sortedPostObjects[i].link+" class=list-group-item><span class=badge>"+sortedPostObjects[i].score+"</span>"+sortedPostObjects[i].title+"</a>";
        }
        htmlString+="</ul></div>"
        $(".postList").html(htmlString);  
    }); // end AJAX callback.
}; // end function
var addAuthors = function(searchText){  
    var r;
    var authors = [];
    var uniqueAuthors = [];
    var uniqueAuthorsCount = [];
    var authorObjects = [];
    var sortedAuthorObjects = [];
    var htmlString = "<div class=panel-body><ul class=list-group>";
    var searchTerm=searchText;
    var qString = {
        q:searchTerm,
        count: 1000,
        limit: 1000
        };      
    $.get('https://www.reddit.com/search.json',qString).success(function(responseData){
        r=responseData.data.children;
        for(i = 0; i<r.length; i++){
            authors.push(r[i].data.author);
        }
        uniqueAuthors = _.uniq(authors);
        for(i=0;i<uniqueAuthors.length;i++){
            uniqueAuthorsCount[i]=0;
            for(j=0;j<authors.length;j++){
                if(uniqueAuthors[i]==authors[j]){
                    uniqueAuthorsCount[i]++;
                }
            } //end 'j' for loop
            authorObjects.push({
                username: uniqueAuthors[i],
                count: uniqueAuthorsCount[i]
            }); // end Object array push
        } // end 'i' for loop
        sortedAuthorObjects = _.sortBy(authorObjects,'count').reverse();
        for(i = 0; i<sortedAuthorObjects.length; i++){
            htmlString+="<a href=http://www.reddit.com/u/"+sortedAuthorObjects[i].username+" class=list-group-item><span class=badge>"+sortedAuthorObjects[i].count+"</span>"+sortedAuthorObjects[i].username+"</a>";
        }
        htmlString+="</ul></div>"
        $(".authorList").html(htmlString);  
    }); // end AJAX callback.
}; // end function
$("document").ready(function(){  
    $("#showSubreddits").click(function(){
        addSubReddits($("#aSearch").val());
    });//end click
    $("#showPosts").click(function(){
        addPosts($("#aSearch").val());
    });//end click
    $("#showAuthors").click(function(){
        addAuthors($("#aSearch").val());
    })
}); //end Ready