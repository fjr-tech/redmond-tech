import tkinter
import random
from tkinter import messagebox
window = tkinter.Tk()
frame = tkinter.Frame(window)
frame.pack()
frame2 = tkinter.Frame(window)
frame2.pack(side='left')
endpl = False
endcom = False
score_player = 0
computer_score = 0

def checkwin():
    global endpl
    global endcom
    global score_player
    global computer_score
    if o1['text'] == "O" and o2['text'] == "O" and o3['text'] == "O":    
        messagebox.showinfo("Information","Player Won")
        score_making()
    elif o4['text'] == "O" and o5['text'] == "O" and o6['text'] == "O":
        messagebox.showinfo("Information","Player Won")
        score_making()
    elif o7['text'] == "O" and o8['text'] == "O" and o9['text'] == "O":
        messagebox.showinfo("Information","Player Won")
        score_making()
    elif o1['text'] == "O" and o4['text'] == "O" and o7['text'] == "O":
        messagebox.showinfo("Information","Player Won")
        score_making()
    elif o2['text'] == "O" and o5['text'] == "O" and o8['text'] == "O":
        messagebox.showinfo("Information","Player Won")
        score_making()
    elif o3['text'] == "O" and o6['text'] == "O" and o9['text'] == "O":
        messagebox.showinfo("Information","Player Won")
        score_making()
    elif o1['text'] == "O" and o5['text'] == "O" and o9['text'] == "O":
        messagebox.showinfo("Information","Player Won")
        score_making()
    elif o3['text'] == "O" and o5['text'] == "O" and o7['text'] == "O":
        messagebox.showinfo("Information","Player Won")
        print(1)
        score_making()
    elif o1['text'] == "X" and o2['text'] == "X" and o3['text'] == "X":
        messagebox.showinfo("Information","AI Won") 
        com_score_making()
    elif o4['text'] == "X" and o5['text'] == "X" and o6['text'] == "X":
        messagebox.showinfo("Information","AI Won")
        com_score_making()
    elif o7['text'] == "X" and o8['text'] == "X" and o9['text'] == "X":
        messagebox.showinfo("Information","AI Won")
        com_score_making()
    elif o1['text'] == "X" and o4['text'] == "X" and o7['text'] == "X":
        messagebox.showinfo("Information","AI Won")
        com_score_making()
    elif o2['text'] == "X" and o5['text'] == "X" and o8['text'] == "X":
        messagebox.showinfo("Information","AI Won")
        com_score_making()
    elif o3['text'] == "X" and o6['text'] == "X" and o9['text'] == "X":
        messagebox.showinfo("Information","AI Won")
        com_score_making()
    elif o1['text'] == "X" and o5['text'] == "X" and o9['text'] == "X":
        messagebox.showinfo("Information","AI Won")
        com_score_making()
    elif o3['text'] == "X" and o5['text'] == "X" and o7['text'] == "X":
        messagebox.showinfo("Information","AI Won")
        com_score_making()
    else:
        return False
    resetfunc()
    return True

def check():
    if len(list_o) == 0:
        print('draw')
        messagebox.showinfo("Information","Draw")
        resetfunc()
        return True
    return False

def o_x(detection):
    global list_o
    if detection in list_o:
        print(2)
        detection['text'] = 'O'
        detection['bg'] = 'blue'
        list_o.remove(detection)  
        if not checkwin() and not check():
            print('hi')
            cpumove()
    else:
        pass
def cpumove():
        print("'Cpu move function")
        if winy1[0]['text'] == 'O' and  winy1[1]['text'] == 'O' and winy1[2]['text'] == '':
            winy1[2]['text'] = 'X'
            winy1[2]["bg"] = "red"
            list_o.remove(winy1[2])
        elif winy1[1]['text'] == 'O' and  winy1[2]['text'] == 'O' and winy1[0]['text'] == '':
            winy1[0]['text'] = 'X'
            winy1[0]["bg"] = "red"
            list_o.remove(winy1[0])
        elif winy1[0]['text'] == 'O' and  winy1[2]['text'] == 'O' and winy1[1]['text'] == '':
            winy1[1]['text'] = 'X'
            winy1[1]["bg"] = "red"
            list_o.remove(winy1[1])

             
    # winy2= [o2,o5,o8]
        elif winy2[0]['text'] == 'O' and  winy2[1]['text'] == 'O' and winy2[2]['text'] == '':
            winy2[2]['text'] = 'X'
            winy2[2]["bg"] = "red"
            list_o.remove(winy2[2])
        elif winy2[1]['text'] == 'O' and  winy2[2]['text'] == 'O' and winy2[0]['text'] == '':
            winy2[0]['text'] = 'X'
            winy2[0]["bg"] = "red"
            list_o.remove(winy2[0])
        elif winy2[0]['text'] == 'O' and  winy2[2]['text'] == 'O' and winy2[1]['text'] == '':
            winy2[1]['text'] = 'X'
            winy2[1]["bg"] = "red"
            list_o.remove(winy2[1])
    # winy3 = [o3,o6,o9]

        elif winy3[0]['text'] == 'O' and  winy3[1]['text'] == 'O' and winy3[2]['text'] == '':
            winy3[2]['text'] = 'X'
            winy3[2]["bg"] = "red"
            list_o.remove(winy3[2])
        elif winy3[1]['text'] == 'O' and  winy3[2]['text'] == 'O' and winy3[0]['text'] == '':
            winy3[0]['text'] = 'X'
            winy3[0]["bg"] = "red"
            list_o.remove(winy3[0])
        elif winy3[0]['text'] == 'O' and  winy3[2]['text'] == 'O' and winy3[1]['text'] == '':
            winy3[1]['text'] = 'X'
            winy3[1]["bg"] = "red"
            list_o.remove(winy3[1])
    # winx1 = [o1,o2,o3]
        elif winx1[0]['text'] == 'O' and  winx1[1]['text'] == 'O' and winx1[2]['text'] == '':
            winx1[2]['text'] = 'X'
            winx1[2]["bg"] = "red"
            list_o.remove(winx1[2])
        elif winx1[1]['text'] == 'O' and  winx1[2]['text'] == 'O' and winx1[0]['text'] == '':
            winx1[0]['text'] = 'X'
            winx1[0]["bg"] = "red"
            list_o.remove(winx1[0])
        elif winx1[0]['text'] == 'O' and  winx1[2]['text'] == 'O' and winx1[1]['text'] == '':
            winx1[1]['text'] = 'X'
            winx1[1]["bg"] = "red"
            list_o.remove(winx1[1])
    # winx2 = [o4,o5,o6]
        elif winx2[0]['text'] == 'O' and  winx2[1]['text'] == 'O' and winx2[2]['text'] == '':
            winx2[2]['text'] = 'X'
            winx2[2]["bg"] = "red"
            list_o.remove(winx2[2])
        elif winx2[1]['text'] == 'O' and  winx2[2]['text'] == 'O' and winx2[0]['text'] == '':
            winx2[0]['text'] = 'X'
            winx2[0]["bg"] = "red"
            list_o.remove(winx2[0])
        elif winx2[0]['text'] == 'O' and  winx2[2]['text'] == 'O' and winx2[1]['text'] == '':
            winx2[1]['text'] = 'X'
            winx2[1]["bg"] = "red"
            list_o.remove(winx2[1])
    # winx3 = [o7,o8,o9]
        elif winx3[0]['text'] == 'O' and  winx3[1]['text'] == 'O' and winx3[2]['text'] == '':
            winx3[2]['text'] = 'X'
            winx3[2]["bg"] = "red"
            list_o.remove(winx3[2])
        elif winx3[1]['text'] == 'O' and  winx3[2]['text'] == 'O' and winx3[0]['text'] == '':
            winx3[0]['text'] = 'X'
            winx3[0]["bg"] = "red"
            list_o.remove(winx3[0])
        elif winx3[0]['text'] == 'O' and  winx3[2]['text'] == 'O' and winx3[1]['text'] == '':
            winx3[1]['text'] = 'X'
            winx3[1]["bg"] = "red"
            list_o.remove(winx3[1])
    # windiag1 = [o1,o5,o9]
        elif windiag1[0]['text'] == 'O' and  windiag1[1]['text'] == 'O' and windiag1[2]['text'] == '':
            windiag1[2]['text'] = 'X'
            windiag1[2]["bg"] = "red"
            list_o.remove(windiag1[2])
        elif windiag1[1]['text'] == 'O' and  windiag1[2]['text'] == 'O' and windiag1[0]['text'] == '':
            windiag1[0]['text'] = 'X'
            windiag1[0]["bg"] = "red"
            list_o.remove(windiag1[0])
        elif windiag1[0]['text'] == 'O' and  windiag1[2]['text'] == 'O' and windiag1[1]['text'] == '':
            windiag1[1]['text'] = 'X'
            windiag1[1]["bg"] = "red"
            list_o.remove(windiag1[1])
        else:
            Compchoice = random.choice(list_o)
            Compchoice['text'] = 'X'
            Compchoice['bg'] = 'red'
            list_o.remove(Compchoice)
            print(list_o)
        checkwin()
        print(list_o)
            #3random 
def resetfunc():
    global list_o
    list_o = [o1,o2,o3,o4,o5,o6,o7,o8,o9]
    for x in list_o:
        x['text'] = ''
        x['bg'] = 'white'
        x['fg'] = 'black'

def score_making():
    global endpl
    global score_player
    global score_player_dis
    score_player += 1
    score_player_dis['text'] = f"Player score = {score_player}"

def com_score_making():
    print('hi_2')
    global endcom
    global computer_score
    global comp_dis
    computer_score += 1
    comp_dis['text'] = f'Comp score = {computer_score}'

def lock():
    global list_o



def lock2():
    global list_o

o1= tkinter.Button(
    text='',
    fg='black',
    bg='white',
    font=('Arial',25),
    master=frame,
    command= lambda: o_x(o1),
    width=5,
    height=1
)
o1.grid(row=1,column=1)



o2 = tkinter.Button(
    text='',
    fg='black',
    bg='white',
    font=('Arial',25),
    master=frame,
    command= lambda: o_x(o2),
    width=5,
    height=1
)
o2.grid(row=1,column=2)


o3 = tkinter.Button(
    text='',
    fg='black',
    bg='white',
    font=('Arial',25),
    master=frame,
    command= lambda: o_x(o3),
    width=5,
    height=1
)
o3.grid(row=1,column=3)


o4 = tkinter.Button(
    text='',
    fg='black',
    bg='white',
    font=('Arial',25),
    master=frame,
    command= lambda: o_x(o4),
    width=5,
    height=1
)
o4.grid(row=2,column=1)


o5 = tkinter.Button(
    text='',
    fg='black',
    bg='white',
    font=('Arial',25),
    master=frame,
    command= lambda: o_x(o5),
    width=5,
    height=1
)
o5.grid(row=2,column=2)


o6 = tkinter.Button(
    text='',
    fg='black',
    bg='white',
    font=('Arial',25),
    master=frame,
    command= lambda: o_x(o6),
    width=5,
    height=1
)
o6.grid(row=2,column=3)

o7 = tkinter.Button(
    text='',
    fg='black',
    bg='white',
    font=('Arial',25),
    master=frame,
    command= lambda: o_x(o7),
    width=5,
    height=1
)
o7.grid(row=3,column=1)

o8 = tkinter.Button(
    text='',
    fg='black',
    bg='white',
    font=('Arial',25),
    master=frame,
    command= lambda: o_x(o8),
    width=5,
    height=1
)
o8.grid(row=3,column=2)

o9 = tkinter.Button(
    text='',
    fg='black',
    bg='white',
    font=('Arial',25),
    master=frame,
    command= lambda: o_x(o9),
    width=5,
    height=1
)
o9.grid(row=3,column=3)


score_player_dis = tkinter.Label(
    text= f'Players score = {score_player}',
    fg='black',
    font=('Arial',25),
    master=frame2
)
score_player_dis.grid(row=1,column=1)

comp_dis = tkinter.Label(
    text= f'Comp score = {computer_score}',
    fg='black',
    font=('Arial',25),
    master=frame2
)
comp_dis.grid(row=2,column=1)

list_o = [o1,o2,o3,o4,o5,o6,o7,o8,o9]
winy1= [o1,o4,o7]
winy2= [o2,o5,o8]
winy3 = [o3,o6,o9]

winx1 = [o1,o2,o3]
winx2 = [o4,o5,o6]
winx3 = [o7,o8,o9]

windiag1 = [o1,o5,o9]
windiag2 = [o3,o5,o7]



end = False
        
window.mainloop()