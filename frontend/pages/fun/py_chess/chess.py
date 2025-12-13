import enum
import tkinter as tk
from tkinter import ttk
from tkinter import messagebox
import enum
import threading
import time
print("hello")
window = tk.Tk()
window.title("Chess")
window.geometry("1170x1270")

frame_board = tk.Frame(master=window, bg="azure3", padx=10, pady=10)
frame_board.pack()
scoreTurn_frame = tk.Frame(master=window, bg="black")
scoreTurn_frame.pack()

turn_indicator = tk.Label(
    master=scoreTurn_frame,
    text="Turn: Player 1 (White)",
    font=("TimesNewRoman", 20, "bold"),
    bg="cyan",
    width=40,
)
turn_indicator.pack()   




possible_move_ki = 0

class Color(enum.Enum):
    WHITE = "white"
    BLACK = "black"

class King:
    def __init__(self, color,):
        self.color = color
        self.symbol = uniDict["King"]
        pass

    def availible_moves(self,x_ki,y_ki):
        global possible_move_ki
        availible_moves = []
        direction = [
            (0,+1),(0,-1),(+1,-1),(+1,0),(+1,+1),(-1,-1),(-1,0),(-1,+1)
        ]
        print("King was checked")
        for i in range (len(direction)):
            new_x = x_ki + direction[i][0]
            new_y = y_ki + direction[i][1]

            if new_x < 0 or new_x > 7:
                continue
            if new_y < 0 or new_y > 7:
                continue
            #if board[new_x][new_y] != sample_Knight.color("black"):
              #  continue
            if board[new_x][new_y] == "":
                availible_moves.append((new_x,new_y))
                # print(availible_moves)
            if board[new_x][new_y] != "":
                if board[new_x][new_y].color == self.color:
                    pass
                if board[new_x][new_y].color != self.color:
                    availible_moves.append((new_x,new_y))
        return availible_moves
        #print(possible_move_ki)

possible_move_kn = 0
class Knight:

    def __init__(self, color):
        self.color = color
        self.symbol = uniDict["Knight"]
        pass
    def availible_moves(self,x_kn,y_kn):
        global possible_move_kn
        availible_moves = []
        direction = [
            (+2,-1),(+2,+1),(+1,-2),(+1,+2),(-1,-2),(-1,+2),(-2,-1),(-2,+1)
        ]
        for i in range(len(direction)):
            new_x = x_kn + direction[i][0]
            new_y = y_kn + direction[i][1]

            if new_x < 0 or new_x > 7:
                continue
            if new_y < 0 or new_y > 7:
                continue
            #if board[new_x][new_y] == sample_King.color("black"):
             #   continue
            if board[new_x][new_y] == "":
                availible_moves.append((new_x,new_y))
            if board[new_x][new_y] != "":
                #print(board[new_x][new_y].color == "black")
                if board[new_x][new_y].color == self.color:
                    pass
                if board[new_x][new_y].color != self.color:
                    availible_moves.append((new_x,new_y))
            #print(f"is King {isinstance(board[new_x][new_y], King)}")
        return availible_moves
class Pawn:

    def __init__(self, color):
        self.color = color
        self.symbol = uniDict["Pawn"]
    def availible_moves(self,x_p,y_p):

        black_pattern = +1
        white_pattern= -1
        direction_attack_white = [(-1,-1),(-1,+1)]
        direction_attack_black = [(+1,-1),(+1,+1)]
        availible_moves = []
        #print(x_p,y_p)
        
        if self.color == Color.WHITE:
            if x_p == 6:
                availible_moves = []
                for i in range(1,3):
                    new_x = x_p - i
                    availible_moves.append((new_x,y_p))
              #  print(availible_moves)
            else:
                availible_moves = []
                new_x = x_p + white_pattern
                if 0 <= new_x < 8 and board[new_x][y_p] == "":
                    availible_moves.append((new_x,y_p))
                    for i in range(2):

                        new_a = x_p + direction_attack_white[i][0]
                        new_b = y_p + direction_attack_white[i][1]
                        if 0 <= new_a < 8 and 0 <= new_b < 8 and board[new_a][new_b] != ""  and board[new_a][new_b].color == Color.BLACK:
                            availible_moves.append((new_a,new_b))
                 #   print(availible_moves)
                else:
                    print("not availible move")
        if self.color == Color.BLACK:
            if x_p == 1:
                availible_moves = []
                for i in range(1,3):
                    new_x = x_p + i
                    availible_moves.append((new_x,y_p))
                #print(availible_moves)
            else:
                availible_moves = []
                new_x = x_p + black_pattern
                if 0 <= new_x < 8 and board[new_x][y_p] == "":
                    availible_moves.append((new_x,y_p))
                    for i in range(2):

                        new_a = x_p + direction_attack_black[i][0]
                        new_b = y_p + direction_attack_black[i][1]
                        if 0 <= new_a < 8 and 0 <= new_b < 8 and board[new_a][new_b] != ""  and board[new_a][new_b].color == Color.WHITE:
                            availible_moves.append((new_a,new_b))
                   # print(availible_moves)
                else:
                    print("not availible move")
        return availible_moves
class Rook:
    def __init__(self, color):
        self.color = color
        self.symbol = uniDict["Rook"]
        pass
    def availible_moves(self,x_r,y_r):
        direction = [-1,+1]
        availible_moves = []
        for i in direction:
            new_x= x_r + i
            #if 0 <= new_x < 8:
            while 0 <= new_x < 8:# and board[new_x][y_r] == "":
                if board[new_x][y_r] == "":
                    availible_moves.append((new_x,y_r))
                if  board[new_x][y_r] != "":
                    if board[new_x][y_r].color == self.color:
                        pass
                    elif board[new_x][y_r].color != self.color:
                        availible_moves.append((new_x,y_r))
                    break
                new_x = new_x + i
         #   print(f'lef or right: {availible_moves}')
            #else:
             #   print("not availible move")
        for i in direction:
            new_y = y_r + i
            while 0 <= new_y < 8:
                if board[x_r][new_y] == "":
                    availible_moves.append((x_r,new_y))
                if  board[x_r][new_y] != "":
                    if board[x_r][new_y].color == self.color:
                        pass
                    elif board[x_r][new_y].color != self.color:
                        availible_moves.append((x_r,new_y))
                    break
                new_y= new_y + i
            print(f'up or down: {availible_moves}')
        return availible_moves
            

class Bishop:

    def __init__(self, color):
        self.color = color
        self.symbol = uniDict["Bishop"]
        pass

    def availible_moves(self,x_b,y_b):

        directions = [(+1,+1),(+1,-1),(-1,+1),(-1,-1)]
        availible_moves = []
        for i in range(len(directions)):
            new_a = x_b + directions[i][0]
            new_b = y_b + directions[i][1]

            while 0 <= new_a < 8 and 0 <= new_b < 8:
                if board[new_a][new_b] == "":
                    availible_moves.append((new_a,new_b))
                if board[new_a][new_b] != "":
                    if board[new_a][new_b].color == self.color:
                        pass
                    elif board[new_a][new_b].color != self.color:
                        availible_moves.append((new_a,new_b))
                    break
                new_a = new_a + directions[i][0]
                new_b = new_b + directions[i][1]
            #print(availible_moves)
        return availible_moves  
            
class Queen:

    def __init__(self,color):
        self.color = color
        self.symbol = uniDict["Queen"]
        pass
    def availible_moves(self,x_q,y_q):
        direction = [-1,+1]
        availible_moves = []
        for i in direction:
            new_x= x_q + i
            #if 0 <= new_x < 8:
            while 0 <= new_x < 8:# and board[new_x][y_r] == "":
                if board[new_x][y_q] == "":
                    availible_moves.append((new_x,y_q))
                if  board[new_x][y_q] != "":
                    if board[new_x][y_q].color == self.color:
                        pass
                    elif board[new_x][y_q].color != self.color:
                        availible_moves.append((new_x,y_q))
                    break
                new_x = new_x + i
            #print(f'lef or right: {availible_moves}')
            #else:
             #   print("not availible move")
        for i in direction:
            new_y = y_q + i
            while 0 <= new_y < 8:
                if board[x_q][new_y] == "":
                    availible_moves.append((x_q,new_y))
                if  board[x_q][new_y] != "":
                    if board[x_q][new_y].color == self.color:
                        pass
                    elif board[x_q][new_y].color != self.color:
                        availible_moves.append((x_q,new_y))
                    break
                new_y= new_y + i
        directions = [(+1,+1),(+1,-1),(-1,+1),(-1,-1)]
        #availible_moves = []
        for i in range(len(directions)):
            new_a = x_q + directions[i][0]
            new_b = y_q + directions[i][1]

            while 0 <= new_a < 8 and 0 <= new_b < 8:
                if board[new_a][new_b] == "":
                    availible_moves.append((new_a,new_b))
                if board[new_a][new_b] != "":
                    if board[new_a][new_b].color == self.color:
                        pass
                    elif board[new_a][new_b].color != self.color:
                        availible_moves.append((new_a,new_b))
                    break
                new_a = new_a + directions[i][0]
                new_b = new_b + directions[i][1]
            #print(availible_moves)
        return availible_moves
    
uniDict = {
    "Pawn": "♙",
    "Rook": "♖",
    "Knight": "♘",
    "Bishop": "♗",
    "King": "♔",
    "Queen": "♕",
}

ro = Rook(color=Color.WHITE)
kn = Knight(color=Color.BLACK)
ki1 = King(color=Color.WHITE)
pa1 = Pawn(color=Color.WHITE)
ki2 = King(color= Color.WHITE)
bi1 = Bishop(color=Color.BLACK)
qu = Queen(color=Color.BLACK)
# Bboard of pieces
board = [
    [qu,"","","","","","",""],
    ["","","","",ro,"","",""],
    ["",kn,"","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","",ki1,"","","","",""],
    ["",bi1,"","","","",pa1,""],
    ["","","","","","","",""]
]    

BOARD_SIZE = len(board)

display_board_arr = []

def reset_turn():

    """  To reset the background board  """

    global display_board_arr
    for r in range(8):
        if r % 2  == 0:
            color = "#FAD893"
        elif r % 2 != 0:
            color = "#FF0000"
        #display_board_arr.append([])
        for c in range(8):
            display_board_arr[r][c]["bg"] = color
            if color == "#FAD893":
                color = "#FF0000"
            elif color == "#FF0000":
                color = "#FAD893" 

    for i in range(8):
        for x in range(8):
            if board[i][x] != "":
                display_board_arr[i][x].config(text = board[i][x].symbol, fg=board[i][x].color.value)
                #Reason why we do fg, is because fg automatically turn the font to black. We are reminding it to turn to the correct color
                print(board[i][x].color)
            if board[i][x] == "":
                display_board_arr[i][x].config(text = "")

class Step(enum.Enum):
    STEP_1 = 1
    STEP_2 = 2
step = Step.STEP_1
def display():
    # copy symbols from board -> display_board_-arr
    global display_board_arr
    for i in range(8):
        for x in range(8):
            if board[i][x] != "":
                display_board_arr[i][x].config(text = board[i][x].symbol, fg=board[i][x].color.value)
                #Reason why we do fg, is because fg automatically turn the font to black. We are reminding it to turn to the correct color
                print(board[i][x].color)
            if board[i][x] == "":
                display_board_arr[i][x].config(text = "")

def moving_process(x,y):
    #global Step
    global square, step, to_highligh_pos, chosen_cor
    if step == Step.STEP_1:
        print(board[x][y])
        chosen_cor = (x,y)
        #text_b = display_board_arr[chosen_cor[0]][chosen_cor[1]]["text"]
        #reset_turn()
        if board[x][y] != "":
            to_highligh_pos = board[x][y].availible_moves(x,y) # None
        
        
            for cell in to_highligh_pos:
               cell_pos1 = cell[0]
               cell_pos2 = cell[1]
               if board[cell_pos1][cell_pos2] == "":
                   display_board_arr[cell_pos1][cell_pos2].config(bg = "orange")
               if board[cell_pos1][cell_pos2] != "":
                   display_board_arr[cell_pos1][cell_pos2].config(bg = "#90EE90")
            #to_highligh_pos = None

            step = Step.STEP_2
    elif step == Step.STEP_2:
        #reset_turn()
        new_pos = (x,y)
        #Ask him if this is the write way
        for i in to_highligh_pos:   
        # *Probably don't need the for loop
            if new_pos in to_highligh_pos:
                
                # Mmove from chosen cor to new position (x,y)
                # move board[][chosen cor] -> board[new position]
                print(chosen_cor)
                board[new_pos[0]][new_pos[1]] = board[chosen_cor[0]][chosen_cor[1]]
                board[chosen_cor[0]][chosen_cor[1]] = ""
                # display board -> display_board_arr by calling display board
                reset_turn()
                #display()
                to_highligh_pos = None
                new_pos = ()
                chosen_cor = ()
                step = Step.STEP_1
            #else:
            #    if new_pos == chosen_cor:
            #        to_highligh_pos = None
            #        new_pos = ()
            #        chosen_cor = ()
#
            #        step = Step.STEP_1
#
            #    continue
            

        # clear board[ex pos]
        # reset step -> step 1 and chosencor -> ()

def setup_board():
    for r in range(8):
        if r % 2  == 0:
            color = "#FAD893"
        elif r % 2 != 0:
            color = "#FF0000"
        display_board_arr.append([])
        for c in range(8):
            if board[r][c] == "":
                tmp_symbol = ""
            else:
                tmp_symbol = board[r][c].symbol
                tmp_color = board[r][c].color
                if tmp_color == Color.BLACK:
                    board_color = "black"
                elif tmp_color == Color.WHITE:
                    board_color = "white"
                
            square = tk.Button(master=frame_board,text=tmp_symbol,fg=board_color,bg=color,font=("arial", 22, "bold"),width=4,height=2,command=lambda x=r,y=c: moving_process(x,y))
            square.grid(row=r, column=c)
            display_board_arr[r].append(square)
            if color == "#FAD893":
                color = "#FF0000"
            elif color == "#FF0000":
                color = "#FAD893" 

setup_board()



window.mainloop()


