Module.register("MMM-NewsAPI", {
    defaults: {
        interval: 1000 * 60 * 30, // 30 minutes
        newsConfig: {
            query: null,
            sources: null,
            domains: null,
            language: 'en',
            sortBy: 'publishedAt',
            category: null,
            country: null,
            newsLimit: 5,
            width: "300px",
            fontSize: "12px"
        },
        apiKey: ''
    },

    start: function() {
        this.articles = [];
        this.getNews();
        this.scheduleUpdate();
    },

    getNews: function() {
        console.log("Requesting news...");
        this.sendSocketNotification('GET_NEWS', {
            query: this.config.newsConfig.query,
            sources: this.config.newsConfig.sources,
            domains: this.config.newsConfig.domains,
            language: this.config.newsConfig.language,
            sortBy: this.config.newsConfig.sortBy,
            category: this.config.newsConfig.category,
            country: this.config.newsConfig.country,
            newsLimit: this.config.newsConfig.newsLimit,
            apiKey: this.config.apiKey
        });
    },

    scheduleUpdate: function() {
        const self = this;
        setInterval(function() {
            self.getNews();
        }, this.config.interval);
    },

    // Handle the received news data from the node helper
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'NEWS_RESULT') {
            this.articles = payload;
            this.updateDom();
        }
    },

    getDom: function() {
        let wrapper = document.createElement("div");
    
        if (this.articles.length === 0) {
            wrapper.innerHTML = "Loading news...";
            return wrapper;
        }
    
        wrapper.className = "compact-news";
        wrapper.style.maxWidth = this.config.newsConfig.width;
        wrapper.style.fontSize = this.config.newsConfig.fontSize;
    
        this.articles.forEach(article => {
            let newsItem = document.createElement("div");
            newsItem.className = "news-item";
    
            let title = document.createElement("span");
            title.innerHTML = article.title;
            title.className = "news-title";
            newsItem.appendChild(title);

            let description = document.createElement("p");
            description.innerHTML = article.description || "";
            description.className = "news-description";
            newsItem.appendChild(description);
    
            wrapper.appendChild(newsItem);
        });
    
        return wrapper;
    },    

    getStyles: function() {
        return ["MMM-NewsAPI.css"];
    },
    
});
