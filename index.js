const https = require('https')

var requestURL = 'https://api.exchangerate.host/latest';
const asians = new Set([
        'KGS', 'NPR', 'EGP', 'ILS', 'JOD', 'MMK',
        'AED', 'MVR', 'AZN', 'USD', 'BTN', 'INR',
        'TWD', 'PKR', 'GEL', 'JOD', 'KRW', 'CNY',
        'VND', 'IQD', 'MYR', 'UZS', 'SGD', 'THB',
        'IDR', 'KHR', 'USD', 'BND', 'SGD', 'TMT',
        'LKR', 'ILS', 'QAR', 'TRY', 'IRR', 'KZT',
        'BHD', 'JPY', 'INR', 'LBP', 'HKD', 'PHP',
        'SAR', 'TJS', 'KWD', 'OMR', 'MOP', 'KPW',
        'SYP', 'MNT', 'AFN', 'YER', 'AMD', 'BDT',
        'LAK'
]);

function req() {
    return new Promise((resolve, reject) => {
        const req = https.get(requestURL, (resp) => {
            let data = ''
            
            resp.on("data", (chunk) => {
                data += chunk
            })
        
            resp.on("end", () => {
                const cData = JSON.parse(data)
                var response = {}
                for(var key in cData.rates) {
                    if (asians.has(key)){
                        response[key] = cData.rates[key]
                    }
                }
                resolve(response)
            })
        })
        req.end()
    })
}

exports.handler = async (event) => {
    const data = await req()
    const response = {
        statusCode: 200,
        body: JSON.stringify(data)
    }
    return response
}