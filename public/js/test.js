fetch(
	"https://graph.facebook.com/t_5577368092356527/messages?fields=from,message,attachments&access_token=EAAD6V7os0gcBO1pwy4p6lc8DBHxL9VmZAN8EkYBf6yv7xmz2d8BYuygLOqt0ZCU8rASZAZAc1zxLUhdeZBj5d9nk1ve3SSH1mIzrOL1guWSvRZCpQRv3oDYS5uZBNn3G2lhFl28FnIytEf7NMcFPemZARtfWY70APLrBEXgvDRCrqIBWUSF1AQmozCWoaZCAYj2850RGhQyrWqwZDZD"
)
	.then((res) => res.json())
	.then((data) => console.log(data));
