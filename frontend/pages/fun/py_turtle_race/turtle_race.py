import random
import turtle
import time

#Setup
windo = turtle.Screen()
windo.title('The Turtle Expierence')
windo.bgcolor('black')
windo.setup(width=400, height=700)
windo.tracer(0)
tina = turtle.Turtle()
tina.color('white')
tina.shape('turtle')
tina.left(90)
tina.penup()
tina.goto(0,-300)
tina.pendown()
#red squares
random_x = random.randint(-190,190)
random_y = random.randint(250,350)
square = turtle.Turtle()
square.color('red')
square.shape('square')
square.shapesize(1)

square.penup()
square.goto(random_x,random_y)



square2 = turtle.Turtle()
square2.color('red')
square2.shape('square')
square2.shapesize(1)

square2.penup()
square2.goto(random_x,random_y)

square3 = square.clone()
square3.penup()
square3.goto(random_x,random_y)

square4 = square.clone()
square4.penup()
square4.goto(random_x,random_y)
#good squares
alt_square = turtle.Turtle()
alt_square.color('green')
alt_square.shape('square')
alt_square.shapesize(1)
alt_square.penup()
alt_square.goto(random_x,random_y)
#neutral
shift_square = turtle.Turtle()
shift_square.color('yellow')
shift_square.shape('square')
shift_square.shapesize(1)
shift_square.penup()
shift_square.goto(random_x,random_y)
#score

score = 0
highscore = 0
pen = turtle.Turtle()
pen.color('white')
pen.penup()
pen.hideturtle()
pen.goto(-180,280)
pen.pendown()
#squares
squares = [square,square2,square3,square4,alt_square,shift_square]


#collision

def collision(placeholder,placeblocker,placecracker):
    global lose
    global score
    random_x = random.randint(-190,190)
    random_y = random.randint(250,350)

    x = tina.xcor()
    y = tina.ycor() 
    leftedge = placeholder.xcor() - 14
    rightedge = placeholder.xcor() + 14
    bottomedge = placeholder.ycor() - 14
    topedge = placeholder.ycor() + 14

    alt_leftedge = placeblocker.xcor() - 14
    alt_rightedge = placeblocker.xcor() + 14
    alt_bottomedge = placeblocker.ycor() - 14
    alt_topedge = placeblocker.ycor() + 14

    shift_leftedge = placecracker.xcor() - 14
    shift_rightedge = placecracker.xcor() + 14
    shift_bottomedge = placecracker.ycor() - 14
    shift_topedge = placecracker.ycor() + 14




    if (x > leftedge and x < rightedge) and (y > bottomedge and y < topedge):

        lose = True
        # == -> comparison
        # = -> assignment
    if (x > alt_leftedge and x < alt_rightedge) and (y > alt_bottomedge and y < alt_topedge):
        
        alt_square.goto(random_x,random_y)
        score += 10

    if (x > shift_leftedge and x < shift_rightedge) and (y > shift_bottomedge and y < shift_topedge): 

        shift_square.goto(random_x,random_y)
        score += 5
#drops

def drops(props,point):
    global score
    global highscore
    random_x = random.randint(-190,190)
    random_y = random.randint(250,350)
    pen.clear() 
    random_x = random.randint(-190,190)
    random_y = random.randint(250,350)
    
    
    pen.write("Point: {}".format(score),move=False, align='left',font=('Arial',
    18,'normal'))

    pen.penup()
    pen.goto(-180,220)
    pen.pendown()

    pen.write("HighScore: {}".format(highscore),move=False, align='left',font=('Arial',18,'normal'))

    pen.penup()
    pen.goto(-180,280)
    pen.pendown()

    if props.ycor() <= -350 :
        score += point
        props.goto(random_x,random_y)
        props.goto(random_x,random_y)
    else:
        random_speed = random.randint(10,25)
        props.sety(props.ycor() - random_speed)
        #shift_props.sety(shift_props.ycor() - random_speed)

#countdown
player = turtle.Turtle()
player.hideturtle()
player.color('White')
player.hideturtle()

def countdown():
    
    for i in range( 5, 0, -1):

            print(i)
            player.write( str(i), move=False,font=("Arial",67, "bold"),align='center')
            time.sleep(1)
            player.clear()
            if i == 1:
                print('Go!')
                player.write('Go!',move=False, font=('',67,'bold'),align='center')
                time.sleep(1)
                player.clear()
    
countdown()
#movement
def movementleft():
    tina.penup()
    tina.left(90)
    tina.forward(20)
    tina.right(90)
    tina.pendown()

def movementright():
    tina.penup()
    tina.right(90)
    tina.forward(20)
    tina.left(90)
    tina.pendown()

def movementup():
    y = tina.ycor()
    tina.penup()
    y += 20
    tina.sety(y)
    tina.pendown()

def movementdown():
    y = tina.ycor()
    tina.penup()
    y -= 20
    tina.sety(y)
    tina.pendown()

def reborn():
    global lose
    global score
    
    gameover = turtle.Turtle()
    gameover.color('white')
    gameover.hideturtle()
    lose = False
    # reset
    for show in squares:
        show.showturtle()
    tina.showturtle()
    score = 0
    tina.penup()
    tina.goto(0,-300)
    for randy in squares:
        randy.goto(random_x,random_y)
    



windo.onkeypress(movementleft,'a')
windo.onkeypress(movementright,'d')
windo.onkeypress(movementup, 'w')
windo.onkeypress(movementdown,'s')
windo.onkeypress(reborn,'space')
windo.listen()

gameover = turtle.Turtle()
gameover.color('white')
gameover.hideturtle()

game = True
lose = False
highscore = 0
#Main game loop
while game:
    if lose == False:
        windo.onkeypress(None,'space')
        windo.listen
        gameover.clear()
        time.sleep(0.1)
        drops(square,1)
        drops(square2,1)
        drops(alt_square,1)
        drops(square3,1)
        drops(square4,1)
        drops(shift_square,-5)
        windo.update()
        collision(square,alt_square,shift_square)
        collision(square2,alt_square,shift_square)
        collision(square3,alt_square,shift_square)
        collision(square4,alt_square,shift_square)
        if score > highscore:
            highscore = score
        if score < highscore:
            highscore = highscore
    
    if lose == True:

        square.hideturtle()
        pen.clear()
        pen.hideturtle()
        for hide in squares:
            hide.hideturtle()
        tina.hideturtle()
        if score > highscore:
            highscore = score
        if score < highscore:
            highscore = highscore
        gameover.write('GAME OVER',move=False,align='center',font=('Arial',34,'normal'))
        gameover.penup()
        gameover.goto(0,-100)
        gameover.pendown
        gameover.write(f"High score: {highscore}",move=False,align='center',font=('Arial',16,'normal'))
        gameover.goto(0,0)
        windo.onkeypress(reborn,'space')
        windo.listen
        while lose == True:
            windo.update()
        





turtle.done()