# MMM-NewsAPI
A module which fetches a number of news article from the NewsAPI and displays the title and the description on your Magic Mirror.

![image](./screenshots/MMM-NewsApi.png)

## Installation

Navigate to the MagicMirror's Module folder:

```bash
cd ~/MagicMirror/modules
```

Clone this repository:

```bash
git clone https://github.com/totoluto/MMM-NewsAPI.git
```

Install the dependencies after navigating to the folder (requires node to be installed):
```bash
cd ./MMM-NewsAPI
npm install
```

Configure the module in your `config.js` file.

## Using the module
To use this module, add the configuration to the modules array in `config/config.js` file:

```js
{
	module: "MMM-NewsAPI",
	position: "bottom_right",
	config: {
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
    	apiKey: 'your-api-key'
	}

		
}
```

## Configuration Options


| Option | Default | Description |
|-----|-----|-----|
| `interval` | `1000 * 60 * 30` | The interval in which the news should be fetched and refreshed. Default is 30 minutes. |
| `newsConfig` | `{}` | In here all the settings are made for the News api call. Check out the [News API](https://newsapi.org/docs/endpoints) for more information on how to configure the API. |
| `newsConfig.width` | `"300px"` | The width of the News Container. All HTML values for dimensions are allowed.
| `newsConfig.fontSize` | `"12px"` | The font size of the the base text. All HTML values for dimensions are allowed.
| `apiKey` | `""` | The API key needed for the request. You can register and get an API key at [News API register site](https://newsapi.org/register).
