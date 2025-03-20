import random

try:    
    username = input( "Wha's your name: " )
except ValueError:
    print( "You need to provide a name" )
else:
    print( "Hi " + username  )
finally:
    print( "Program starting" )

# Initial balance is loaded from the file if it exists, otherwise starts at 0
balance = 0
scenario_counter = 0  # Counter to track the number of scenario selections

# Define amount choices the user can select from
answerChoices = [1, 2, 3, 4, 5]  # Option 5 now represents a random amount
greeting_choices = [1, 2, 3]

for currentAnswerChoice in answerChoices:
    print( "Current answer" + str (currentAnswerChoice) )

MAX_BALANCE = 100

def add_money_to_balance(current_balance, amount):
    return current_balance + amount

def save_balance_to_file(current_balance):
    # This would be where you write the balance to a file
    print(f"Balance saved: ${current_balance}")

while balance <= MAX_BALANCE:
    print("\nWelcome to the bank, how may we help you?")
    print(f"You have selected scenarios {scenario_counter} times so far.")  # Display the counter
    greeting_choice = input("Enter the scenario (1 - Add money, 2 - No service, 3 - Steal money): ")

    if greeting_choice.isdigit():
        greeting_choice = int(greeting_choice)
        
        if greeting_choice in greeting_choices:
            scenario_counter += 1  # Increment the counter for each scenario selection
            
            # Scenario 1: Adding money to the account
            if greeting_choice == 1:
                print("Let's add some cash to your account.")
                if balance <= 0:
                    print(f"You currently have ${balance}.")
                else:
                    print(f"Your current balance is ${balance}, which is low.")
                
                print("How much money do you want to add?", answerChoices)
                user_choice = input("Enter the amount (1, 2, 3, 4, or 5 for random amount), or type 'exit' to leave: ")

                if user_choice.lower() == 'exit':
                    break

                try:
                    user_choice = int(user_choice)

                    if user_choice in answerChoices:
                        # Check if the user chose option 5 (random amount)
                        if user_choice == 5:
                            random_amount = random.randint(1, 10)  # Random amount between 1 and 10
                            balance = add_money_to_balance(balance, random_amount)
                            print(f"Random event! You have added ${random_amount}. Your new balance is ${balance}.")
                        else:
                            balance = add_money_to_balance(balance, user_choice)
                            print(f"You have added ${user_choice}. Your new balance is ${balance}.")
                        
                        save_balance_to_file(balance)
                    else:
                        print("That choice is invalid. Please choose one of the amounts listed.")
                except ValueError:
                    print("Invalid amount chosen.")

            # Scenario 2: Refusal of service
            elif greeting_choice == 2:
                print("We don't have money for your kind, sir. Please don't ask again.")

            # Scenario 3: Stealing money (50/50 chance)
            elif greeting_choice == 3:
                print("Sir, if you keep asking for money, we will have to ask you to leave.")
                user_choice = input("Enter the amount of money to steal (1, 2, 3, 4, or 5 for random amount): ")

                if user_choice.isdigit():
                    user_choice = int(user_choice)

                    if user_choice in answerChoices:
                        # 50/50 chance to either gain or lose the stolen amount
                        steal_success = random.choice([True, False])

                        # Handle random amount selection for Option 5
                        if user_choice == 5:
                            random_amount = random.randint(1, 10)  # Random amount between 1 and 10
                            user_choice = random_amount
                            print(f"Random event! The amount to steal is ${random_amount}.")

                        if steal_success:
                            balance += user_choice
                            print(f"Success! You have stolen ${user_choice}. Your new balance is ${balance}.")
                        else:
                            if balance - user_choice >= 0:
                                balance -= user_choice
                                print(f"Oops! You got caught! ${user_choice} has been deducted. Your new balance is ${balance}.")
                            else:
                                print(f"Insufficient funds! You cannot lose more than your current balance of ${balance}.")
                        
                        save_balance_to_file(balance)
                    else:
                        print("That choice is invalid. Please choose one of the amounts listed.")
                else:
                    print("Invalid input. Please enter a number.")

        else:
            print("Invalid scenario. Please choose 1, 2, or 3.")

    else:
        print("Invalid input. Please enter a number.")

# Final message when balance exceeds the maximum limit
if balance >= MAX_BALANCE:
    print("Your balance is over the limit, and you will no longer earn money.")
