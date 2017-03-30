from chatterbot import ChatBot

chatbot = ChatBot('Karthik', silence_performance_warning=True)

# chatbot.train("chatterbot.corpus.english")

while True:
	req = input("You: ")
	# print("Bot: " + str(chatbot.get_response(req)))
	print("Hello")
