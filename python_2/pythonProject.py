balance = 0
answerChoices = [1, 2, 3, 4]
greeting_choices = [1, 2, 3]


print("Welcome to the bank, how may we help you?")
greeting_choice = input("Enter the scenario (1 for adding money, 2 for no money, 3 for stealing): ")

if greeting_choice.isdigit():
    greeting_choice = int(greeting_choice)
    
    if greeting_choice in greeting_choices:
        while True:  
            if greeting_choice == 1:
                print("Let's add some cash to your account.")
                
                if balance <= 0:
                    print("You currently have", balance)
                else:
                    print("Your current balance is", balance, "which is low.")

                print("How much money do you want?", answerChoices)
                user_choice = input("Enter the amount (1, 2, 3, or 4), or type 'exit' to leave: ")

                if user_choice.lower() == 'exit':
                    print("Thank you for using our services. Goodbye!")
                    break  

                if user_choice.isdigit():
                    user_choice = int(user_choice)
                    
                    if user_choice in answerChoices:
                        balance += user_choice
                        print(f"You have added ${user_choice}. Your new balance is {balance}.")
                    else:
                        print("That choice is invalid. Please choose one of the amounts listed.")
                else:
                    print("Invalid amount chosen.")

            elif greeting_choice == 2:
                print("We don't have money for your kind, sir. Please don't click 3 though.")
                break  

            elif greeting_choice == 3:
                print("Sir, if you keep asking for money, then we will have to ask you to leave.")
                
                user_choice = input("Enter the amount of money to steal (1, 2, 3, or 4), or type 'exit' to leave: ")

                if user_choice.lower() == 'exit':
                    print("Thank you for using our services. Goodbye!")
                    break  

                if user_choice.isdigit():
                    user_choice = int(user_choice)
                    
                    if user_choice in answerChoices:
                        print(f"You attempted to steal ${user_choice}.")
                    else:
                        print("That choice is invalid. Please choose one of the amounts listed.")
                else:
                    print("Invalid amount chosen.")
    else:
        print("Invalid scenario choice. Please choose 1, 2, or 3.")
else:
    print("Invalid input. Please enter a number.")
