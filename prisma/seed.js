const { PrismaClient } = require("@prisma/client");
const { visitedStadium } = require(".");
const prisma = new PrismaClient();

const createStadiums = async () => {
  try {
    const stadiums = [
      {
        name: "Stadium 1",
        teamName: "Team 1",
        division: "Division 1",
        zipCode: 12345,
        state: "CA",
        capacity: 50000,
        openYear: 1974,
        imageOutsideURL: "imageOutsideURL1",
        imageInsideURL: "imageInsideURL1",
      },
      {
        name: "Stadium 2",
        teamName: "Team 2",
        division: "Division 2",
        zipCode: 54321,
        state: "NY",
        capacity: 60000,
        openYear: 1984,
        imageOutsideURL: "imageOutsideURL2",
        imageInsideURL: "imageInsideURL2",
      },
      {
        name: "Stadium 3",
        teamName: "Team 3",
        division: "Division 3",
        zipCode: 67890,
        state: "TX",
        capacity: 70000,
        openYear: 1994,
        imageOutsideURL: "imageOutsideURL3",
        imageInsideURL: "imageInsideURL3",
      },
      {
        name: "Stadium 4",
        teamName: "Team 4",
        division: "Division 4",
        zipCode: 19876,
        state: "FL",
        capacity: 45678,
        openYear: 1974,
        imageOutsideURL: "imageOutsideURL4",
        imageInsideURL: "imageInsideURL4",
      },
    ];
    await prisma.stadium.createMany({ data: stadiums });
  } catch (error) {
    console.error("Error creating stadiums:", error);
  }
};

const createUsers = async () => {
  try {
    const users = [
      { username: "aliceuser", password: "password1", firstName: "Alice", lastName: "Smith", email: "alice@email.com" },
      { username: "bobuser", password: "password2", firstName: "Bob", lastName: "Smith", email: "bob@email.com"}, 
      { username: "charlieuser", password: "password3", firstName: "Charlie", lastName: "Smith", email: "charlie@email.com"},
      { username: "daveuser", password: "password4", firstName: "Dave", lastName: "Smith", email: "dave@email.com"},
      { username: "eveuser", password: "password5", firstName: "Eve", lastName: "Smith", email: "eve@email.com"}
    ];
    await prisma.user.createMany({ data: users });
  } catch (error) {
    console.error("Error creating users:", error);
  }
};

const createReviews = async () => {
  try {
    const reviews = [
      {
        date: new Date("1947-12-14"),
        rating: 10,
        comment: "I loved the stadium",
        userId: 1,
        stadiumId: 1,
      },
      {
        date: new Date("1957-09-24"),
        rating: 10,
        comment: "I liked the stadium",
        userId: 2,
        stadiumId: 2,
      },
      {
        date: new Date("1910-02-19"),
        rating: 10,
        comment: "I did not like the stadium",
        userId: 3,
        stadiumId: 2,
      },
      {
        date: new Date("1947-12-14"),
        rating: 10,
        comment: "I loved the stadium",
        userId: 1,
        stadiumId: 2,
      },
      {
        date: new Date("1957-09-24"),
        rating: 10,
        comment: "I liked the stadium",
        userId: 2,
        stadiumId: 3,
      },
      {
        date: new Date("1910-02-19"),
        rating: 10,
        comment: "I did not like the stadium",
        userId: 3,
        stadiumId: 4,
      },
    ];
    await prisma.review.createMany({ data: reviews });
  } catch (error) {
    console.error("Error creating reviews:", error);
  }
};

const createComments = async () => {
  try {
    const comments = [
      { content: "Average stadium and food sucked", userId: 1, reviewId: 1 },
      { content: "Great Stadium", userId: 2, reviewId: 2 },
      { content: "Will be coming back", userId: 3, reviewId: 3 },
      { content: "Seat was way too hard", userId: 1, reviewId: 4 },
      { content: "I thought I was going to a football game", userId: 2, reviewId: 5 },
      { content: "Hotdog was unreal, 10/10 reccommended", userId: 3, reviewId: 6 },
      { content: "Go Padres!", userId: 1, reviewId: 1 },
    ];
    await prisma.comment.createMany({ data: comments });
  } catch (error) {
    console.error("Error creating comments:", error);
  }
};

const createVisitedStadiums = async () => {
  try {
    const visitedStadiums = [
      { userId: 1, stadiumId: 1 },
      { userId: 1, stadiumId: 2 },
      { userId: 1, stadiumId: 3 },
      { userId: 2, stadiumId: 2 },
      { userId: 3, stadiumId: 3 },
    ];
    console.log("Creating visited stadiums:", visitedStadiums);
    await prisma.visitedStadium.createMany({ data: visitedStadiums });
    console.log("Visited stadiums created successfully");
  } catch (error) {
    console.error("Error creating visited stadiums:", error);
  }
};

const main = async () => {
  await createStadiums();
  await createUsers();
  await createReviews();
  await createComments();
  await createVisitedStadiums();
  await prisma.$disconnect();
};

main().catch((error) => {
  console.error("Error in main execution:", error);
  prisma.$disconnect();
  process.exit(1);
});
