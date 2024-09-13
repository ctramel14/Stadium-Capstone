const { PrismaClient } = require("@prisma/client");
const { visitedStadium, stadium } = require(".");
const prisma = new PrismaClient();

// STADIUMS
const createStadiums = async () => {
  try {
    const stadiums = [
      {
        name: "Chase Field",
        teamName: "Arizona Diamondbacks",
        division: "National League West",
        address: "401 E Jefferson St",
        city: "Phoenix",
        state: "AZ",
        zipCode: 85004,
        capacity: 48519,
        openYear: 1998,
        imageOutsideURL: "imageOutsideURL1",
        imageInsideURL: "imageInsideURL1",
      },
      {
        name: "Truist Park",
        teamName: "Atlanta Braves",
        division: "National League East",
        address: "755 Battery Ave SE",
        city: "Atlanta",
        state: "GA",
        zipCode: 30339,
        capacity: 41084,
        openYear: 2017,
        imageOutsideURL: "imageOutsideURL2",
        imageInsideURL: "imageInsideURL2",
      },
      {
        name: "Camden Yards",
        teamName: "Baltimore Orioles",
        division: "American League East",
        address: "333 W Camden St",
        city: "Baltimore",
        state: "MD",
        zipCode: 21201,
        capacity: 45971,
        openYear: 1992,
        imageOutsideURL: "imageOutsideURL3",
        imageInsideURL: "imageInsideURL3",
      },
      {
        name: "Fenway Park",
        teamName: "Boston Red Sox",
        division: "American League East",
        address: "4 Jersey St",
        city: "Boston",
        state: "MA",
        zipCode: 2215,
        capacity: 37755,
        openYear: 1912,
        imageOutsideURL: "imageOutsideURL4",
        imageInsideURL: "imageInsideURL4",
      },
      {
        name: "Wrigley Field",
        teamName: "Chicago Cubs",
        division: "National League Central",
        address: "1060 W Addison St",
        city: "Chicago",
        state: "IL",
        zipCode: 60613,
        capacity: 41649,
        openYear: 1914,
        imageOutsideURL: "imageOutsideURL5",
        imageInsideURL: "imageInsideURL5",
      },
      // {
      //   name: "Guaranteed Rate Field",
      //   teamName: "Chicago White Sox",
      //   division: "American League Central",
      //   address: "333 W 35th St",
      //   city: "Chicago",
      //   state: "IL",
      //   zipCode: 60616,
      //   capacity: 40615,
      //   openYear: 1991,
      //   imageOutsideURL: "imageOutsideURL6",
      //   imageInsideURL: "imageInsideURL6",
      // },
      // {
      //   name: "Great American Ball Park",
      //   teamName: "Cincinnati Reds",
      //   division: "National League Central",
      //   address: "100 Joe Nuxhall Way",
      //   city: "Cincinnati",
      //   state: "OH",
      //   zipCode: 45202,
      //   capacity: 42271,
      //   openYear: 2003,
      //   imageOutsideURL: "imageOutsideURL7",
      //   imageInsideURL: "imageInsideURL7",
      // },
      // {
      //   name: "Progressive Field",
      //   teamName: "Cleveland Guardians",
      //   division: "American League Central",
      //   address: "2401 Ontario St",
      //   city: "Cleveland",
      //   state: "OH",
      //   zipCode: 44115,
      //   capacity: 34830,
      //   openYear: 1994,
      //   imageOutsideURL: "imageOutsideURL8",
      //   imageInsideURL: "imageInsideURL8",
      // },
      // {
      //   name: "Coors Field",
      //   teamName: "Colorado Rockies",
      //   division: "National League West",
      //   address: "2001 Blake St",
      //   city: "Denver",
      //   state: "CO",
      //   zipCode: 80205,
      //   capacity: 50398,
      //   openYear: 1995,
      //   imageOutsideURL: "imageOutsideURL9",
      //   imageInsideURL: "imageInsideURL9",
      // },
      // {
      //   name: "Comerica Park",
      //   teamName: "Detroit Tigers",
      //   division: "American League Central",
      //   address: "2100 Woodward Ave",
      //   city: "Detroit",
      //   state: "MI",
      //   zipCode: 48201,
      //   capacity: 41083,
      //   openYear: 2000,
      //   imageOutsideURL: "imageOutsideURL10",
      //   imageInsideURL: "imageInsideURL10",
      // },
      // {
      //   name: "Minute Maid Park",
      //   teamName: "Houston Astros",
      //   division: "American League West",
      //   address: "501 Crawford St",
      //   city: "Houston",
      //   state: "TX",
      //   zipCode: 77002,
      //   capacity: 41000,
      //   openYear: 2000,
      //   imageOutsideURL: "imageOutsideURL11",
      //   imageInsideURL: "imageInsideURL11",
      // },
      // {
      //   name: "Kauffman Stadium",
      //   teamName: "Kansas City Royals",
      //   division: "American League Central",
      //   address: "1 Royal Way",
      //   city: "Kansas City",
      //   state: "MO",
      //   zipCode: 64129,
      //   capacity: 37903,
      //   openYear: 1973,
      //   imageOutsideURL: "imageOutsideURL12",
      //   imageInsideURL: "imageInsideURL12",
      // },
      // {
      //   name: "Angel Stadium",
      //   teamName: "Los Angeles Angels",
      //   division: "American League West",
      //   address: "2000 E Gene Autry Way",
      //   city: "Anaheim",
      //   state: "CA",
      //   zipCode: 92806,
      //   capacity: 45050,
      //   openYear: 1966,
      //   imageOutsideURL: "imageOutsideURL13",
      //   imageInsideURL: "imageInsideURL13",
      // },
      // {
      //   name: "Dodger Stadium",
      //   teamName: "Los Angeles Dodgers",
      //   division: "National League West",
      //   address: "1000 Vin Scully Ave",
      //   city: "Los Angeles",
      //   state: "CA",
      //   zipCode: 90012,
      //   capacity: 56000,
      //   openYear: 1962,
      //   imageOutsideURL: "imageOutsideURL14",
      //   imageInsideURL: "imageInsideURL14",
      // },
      // {
      //   name: "loanDepot Park",
      //   teamName: "Miami Marlins",
      //   division: "National League East",
      //   address: "501 Marlins Way",
      //   city: "Miami",
      //   state: "FL",
      //   zipCode: 33125,
      //   capacity: 37000,
      //   openYear: 2012,
      //   imageOutsideURL: "imageOutsideURL15",
      //   imageInsideURL: "imageInsideURL15",
      // },
      // {
      //   name: "American Family Field",
      //   teamName: "Milwaukee Brewers",
      //   division: "National League Central",
      //   address: "1 Brewers Way",
      //   city: "Milwaukee",
      //   state: "WI",
      //   zipCode: 53214,
      //   capacity: 41900,
      //   openYear: 2001,
      //   imageOutsideURL: "imageOutsideURL16",
      //   imageInsideURL: "imageInsideURL16",
      // },
      // {
      //   name: "Target Field",
      //   teamName: "Minnesota Twins",
      //   division: "American League Central",
      //   address: "1 Twins Way",
      //   city: "Minneapolis",
      //   state: "MN",
      //   zipCode: 55403,
      //   capacity: 39.504,
      //   openYear: 2010,
      //   imageOutsideURL: "imageOutsideURL17",
      //   imageInsideURL: "imageInsideURL17",
      // },
      // {
      //   name: "Citi Field",
      //   teamName: "New York Mets",
      //   division: "National League East",
      //   address: "41 Seaver Way",
      //   city: "New York",
      //   state: "NY",
      //   zipCode: 11368,
      //   capacity: 41922,
      //   openYear: 2009,
      //   imageOutsideURL: "imageOutsideURL18",
      //   imageInsideURL: "imageInsideURL18",
      // },
      // {
      //   name: "Yankee Stadium",
      //   teamName: "New York Yankees",
      //   division: "American League East",
      //   address: "1 E 161st St",
      //   city: "Bronx",
      //   state: "NY",
      //   zipCode: 10451,
      //   capacity: 46537,
      //   openYear: 2009,
      //   imageOutsideURL: "imageOutsideURL19",
      //   imageInsideURL: "imageInsideURL19",
      // },
      // {
      //   name: "Oakland Coliseum",
      //   teamName: "Oakland Athletics",
      //   division: "American League West",
      //   address: "7000 Coliseum Way",
      //   city: "Oakland",
      //   state: "CA",
      //   zipCode: 94621,
      //   capacity: 63000,
      //   openYear: 1966,
      //   imageOutsideURL: "imageOutsideURL20",
      //   imageInsideURL: "imageInsideURL20",
      // },
      // {
      //   name: "Citizens Bank Park",
      //   teamName: "Philadelphia Phillies",
      //   division: "National League East",
      //   address: "1 Citizens Bank Way",
      //   city: "Philadelphia",
      //   state: "PA",
      //   zipCode: 19148,
      //   capacity: 42901,
      //   openYear: 2004,
      //   imageOutsideURL: "imageOutsideURL21",
      //   imageInsideURL: "imageInsideURL21",
      // },
      // {
      //   name: "PNC Park",
      //   teamName: "Pittsburgh Pirates",
      //   division: "National League Central",
      //   address: "115 Federal St",
      //   city: "Pittsburgh",
      //   state: "PA",
      //   zipCode: 15212,
      //   capacity: 38747,
      //   openYear: 2001,
      //   imageOutsideURL: "imageOutsideURL22",
      //   imageInsideURL: "imageInsideURL22",
      // },
      // {
      //   name: "Petco Park",
      //   teamName: "San Diego Padres",
      //   division: "National League West",
      //   address: "100 Park Blvd",
      //   city: "San Diego",
      //   state: "CA",
      //   zipCode: 92101,
      //   capacity: 42445,
      //   openYear: 2004,
      //   imageOutsideURL: "imageOutsideURL23",
      //   imageInsideURL: "imageInsideURL23",
      // },
      // {
      //   name: "Oracle Park",
      //   teamName: "San Francisco Giants",
      //   division: "National League West",
      //   address: "24 Willie Mays Plaza",
      //   city: "San Francisco",
      //   state: "CA",
      //   zipCode: 94107,
      //   capacity: 42300,
      //   openYear: 2000,
      //   imageOutsideURL: "imageOutsideURL24",
      //   imageInsideURL: "imageInsideURL24",
      // },
      // {
      //   name: "T-Mobile Park",
      //   teamName: "Seattle Mariners",
      //   division: "American League West",
      //   address: "1250 1st Ave S",
      //   city: "Seattle",
      //   state: "WA",
      //   zipCode: 98134,
      //   capacity: 47943,
      //   openYear: 1999,
      //   imageOutsideURL: "imageOutsideURL25",
      //   imageInsideURL: "imageInsideURL25",
      // },
      // {
      //   name: "Busch Stadium",
      //   teamName: "St. Louis Cardinals",
      //   division: "National League Central",
      //   address: "700 Clark Ave",
      //   city: "St. Louis",
      //   state: "MO",
      //   zipCode: 63102,
      //   capacity: 46000,
      //   openYear: 2006,
      //   imageOutsideURL: "imageOutsideURL26",
      //   imageInsideURL: "imageInsideURL26",
      // },
      // {
      //   name: "Tropicana Field",
      //   teamName: "Tampa Bay Rays",
      //   division: "American League East",
      //   address: "1 Tropicana Dr",
      //   city: "St. Petersburg",
      //   state: "FL",
      //   zipCode: 33705,
      //   capacity: 42735,
      //   openYear: 1990,
      //   imageOutsideURL: "imageOutsideURL27",
      //   imageInsideURL: "imageInsideURL27",
      // },
      // {
      //   name: "Globe Life Field",
      //   teamName: "Texas Rangers",
      //   division: "American League West",
      //   address: "734 Stadium Dr",
      //   city: "Arlington",
      //   state: "TX",
      //   zipCode: 76011,
      //   capacity: 40300,
      //   openYear: 2020,
      //   imageOutsideURL: "imageOutsideURL28",
      //   imageInsideURL: "imageInsideURL28",
      // },
      // {
      //   name: "Rogers Centre",
      //   teamName: "Toronto Blue Jays",
      //   division: "American League East",
      //   address: "1 Blue Jays Way",
      //   city: "Toronto",
      //   state: "ON",
      //   zipCode: "M5V 1J1",
      //   capacity: 49286,
      //   openYear: 1989,
      //   imageOutsideURL: "imageOutsideURL29",
      //   imageInsideURL: "imageInsideURL29",
      // },
      // {
      //   name: "Nationals Park",
      //   teamName: "Washington Nationals",
      //   division: "National League East",
      //   address: "1500 S Capitol St SE",
      //   city: "Washington",
      //   state: "DC",
      //   zipCode: 20003,
      //   capacity: 41546,
      //   openYear: 2008,
      //   imageOutsideURL: "imageOutsideURL30",
      //   imageInsideURL: "imageInsideURL30",
      // }
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

const createRestaurants = async () => {
  try {
    const restaurants = [
      {
        name: "Restaurant 1",
        cuisine: "Italian",
        address: "1234 Main St",
        city: "San Diego",
        state: "CA",
        zipCode: 12345,
        stadiumId: 1,
      },
      {
        name: "Restaurant 2",
        cuisine: "Mexican",
        address: "5678 Main St",
        city: "San Diego",  
        state: "CA",
        zipCode: 12346,
        stadiumId: 2,
      },
      {
        name: "Restaurant 3",
        cuisine: "American",
        address: "9101 Main St",
        city: "San Diego",
        state: "CA",
        zipCode: 12347,
        stadiumId: 3,
      },
      {
        name: "Restaurant 4",
        cuisine: "Japanese",
        address: "1123 Main St",
        city: "San Diego",
        state: "CA",
        zipCode: 12348,
        stadiumId: 4,
      },
      {
        name: "Restaurant 5",
        cuisine: "Chinese",
        address: "1234 Main St",
        city: "San Diego",
        state: "CA",
        zipCode: 12345,
        stadiumId: 5,
      }
    ];
    await prisma.restaurant.createMany({ data: restaurants });
  } catch (error) {
    console.error("Error creating restaurants:", error);
  }
}

const createHotels = async () => {
  try {
    const hotels = [
      {
        name: "Hotel 1",
        address: "1234 Main St",
        city: "San Diego",
        state: "CA",
        zipCode: 12345,
        stadiumId: 1,
      },
      {
        name: "Hotel 2",
        address: "5678 Main St",
        city: "San Diego",  
        state: "CA",
        zipCode: 12346,
        stadiumId: 2,
      },
      {
        name: "Hotel 3",
        address: "9101 Main St",
        city: "San Diego",
        state: "CA",
        zipCode: 12347,
        stadiumId: 3,
      },
      {
        name: "Hotel 4",
        address: "1123 Main St",
        city: "San Diego",
        state: "CA",
        zipCode: 12348,
        stadiumId: 4,
      },
      {
        name: "Hotel 5",
        address: "1234 Main St",
        city: "San Diego",
        state: "CA",
        zipCode: 12345,
        stadiumId: 5,
      }
    ];
    await prisma.hotel.createMany({ data: hotels });
  } catch (error) {
    console.error("Error creating hotels:", error);
  }
}

const main = async () => {
  await createStadiums();
  await createUsers();
  await createReviews();
  await createComments();
  await createVisitedStadiums();
  await createRestaurants();
  await createHotels();
  await prisma.$disconnect();
};

main().catch((error) => {
  console.error("Error in main execution:", error);
  prisma.$disconnect();
  process.exit(1);
});
