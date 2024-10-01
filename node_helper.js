const NodeHelper = require('node_helper');
const NewsAPI = require('newsapi');

module.exports = NodeHelper.create({
    start: function() {
        console.log("MMM-NewsAPI helper started...");
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_NEWS') {
            this.getNews(payload);
        }
    },

    getNews: function(config) {
        const newsapi = new NewsAPI(config.apiKey);
        let options = {
            q: config.query,
            sources: config.sources,
            domains: config.domains,
            language: config.language,
            sortBy: config.sortBy,
            category: config.category,
            country: config.country
        };

        Object.keys(options).forEach(key => {
            if (options[key] === null || options[key] === undefined) {
                delete options[key];
            }
        });

        newsapi.v2.topHeadlines(options)
            .then(response => {
                if (response.status === 'ok') {
                    console.log("News fetched successfully:", response.articles.length, "articles found.");
                    this.sendSocketNotification('NEWS_RESULT', response.articles.slice(0, config.newsLimit));
                } else {
                    console.log("Failed to fetch news:", response);
                }
            })
            .catch(error => {
                console.error("Error fetching news:", error);
            });
    }
});
