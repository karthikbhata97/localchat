from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer

chatterbot = ChatBot("Traaining example")
chatterbot.set_trainer(ListTrainer)

mylist = []
conv = "Hello"
flag = 1
while conv != "Bye":
	if flag == 1:
		conv = input("You: ")
	else:
		conv = input("Bot: ")
	mylist.append(conv)
	flag = -flag

print(mylist)
chatterbot.train(mylist)

chatbot = ChatBot('Karthik', silence_performance_warning=True)

while True:
	req = input("You: ")
	if  req == "Bye":
		break
	print("Bot: " + str(chatbot.get_response(req)))

chatbot.trainer.export_for_training('./my_export.json')
