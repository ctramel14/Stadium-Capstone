const { PrismaClient } = require("@prisma/client");
const { visitedStadium, stadium } = require(".");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

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
        imageOutsideURL:
          "https://sportsnaut.com/wp-content/uploads/2022/09/Screen-Shot-2022-09-21-at-7.39.04-PM.png",
        imageInsideURL:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Reserve_A-10_Warthogs_Flyover_2023_World_Series_%288099146%29.jpg/1280px-Reserve_A-10_Warthogs_Flyover_2023_World_Series_%288099146%29.jpg",
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
        imageOutsideURL:
          "https://www.usanova.com/wp-content/uploads/2021/10/Untitled-5.jpg",
        imageInsideURL:
          "https://travelcobb.org/wp-content/uploads/2023/01/Truist-PArk_-updated-image.png",
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
        imageOutsideURL:
          "https://d2uqqhmijd5j2z.cloudfront.net/files/130133/original/Camden_Yards_entrance.JPG?1482169604",
        imageInsideURL:
          "https://upload.wikimedia.org/wikipedia/commons/d/d8/Camden_Yards.jpg",
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
        imageOutsideURL:
          "https://media.nbcboston.com/2021/08/fenway-park-05900xx6720-4480-0-0.jpg?quality=85&strip=all&resize=1200%2C675",
        imageInsideURL:
          "https://ballparkratings.com/wp-content/uploads/IMG_1852-scaled.jpeg",
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
        imageOutsideURL:
          "https://interactive.wttw.com/sites/default/files/cbl-lakeview-wrigleyville-hero_01.jpg",
        imageInsideURL:
          "https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/wrig23main.jpg",
      },
      {
        name: "Guaranteed Rate Field",
        teamName: "Chicago White Sox",
        division: "American League Central",
        address: "333 W 35th St",
        city: "Chicago",
        state: "IL",
        zipCode: 60616,
        capacity: 40615,
        openYear: 1991,
        imageOutsideURL:
          "https://ballparkratings.com/wp-content/uploads/1-1-8-3.jpeg",
        imageInsideURL:
          "https://upload.wikimedia.org/wikipedia/commons/e/e2/U.S._Cellular_Field_%2830972191694%29.jpg",
      },
      {
        name: "Great American Ball Park",
        teamName: "Cincinnati Reds",
        division: "National League Central",
        address: "100 Joe Nuxhall Way",
        city: "Cincinnati",
        state: "OH",
        zipCode: 45202,
        capacity: 42271,
        openYear: 2003,
        imageOutsideURL:
          "https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/gab15952.png",
        imageInsideURL:
          "https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/gab23main.jpg",
      },
      {
        name: "Progressive Field",
        teamName: "Cleveland Guardians",
        division: "American League Central",
        address: "2401 Ontario St",
        city: "Cleveland",
        state: "OH",
        zipCode: 44115,
        capacity: 34830,
        openYear: 1994,
        imageOutsideURL:
          "https://ballparkratings.com/wp-content/uploads/32407150_981859368638745_8809335080691433472_n.jpeg",
        imageInsideURL:
          "https://baseballinstadiums.com/wp-content/uploads/2021/05/Crains-Cleveland.jpg",
      },
      {
        name: "Coors Field",
        teamName: "Colorado Rockies",
        division: "National League West",
        address: "2001 Blake St",
        city: "Denver",
        state: "CO",
        zipCode: 80205,
        capacity: 50398,
        openYear: 1995,
        imageOutsideURL:
          "https://cdn.vox-cdn.com/thumbor/5Bf7nINE9kn3wppcPg_E-x41fWE=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/15999241/shutterstock_1150908299.jpg",
        imageInsideURL:
          "https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/coors23main.jpg",
      },
      {
        name: "Comerica Park",
        teamName: "Detroit Tigers",
        division: "American League Central",
        address: "2100 Woodward Ave",
        city: "Detroit",
        state: "MI",
        zipCode: 48201,
        capacity: 41083,
        openYear: 2000,
        imageOutsideURL:
          "https://whitecon.com/wp-content/uploads/2019/11/whitecon.com-comerica-park-001.jpg",
        imageInsideURL:
          "https://www.michigan.org/sites/default/files/listing_images/profile/5071/18716fd060acb259b217d3ab7af5f1ec_comerica-park_opening-day_detroit-tigers_22.jpg",
      },
      {
        name: "Minute Maid Park",
        teamName: "Houston Astros",
        division: "American League West",
        address: "501 Crawford St",
        city: "Houston",
        state: "TX",
        zipCode: 77002,
        capacity: 41000,
        openYear: 2000,
        imageOutsideURL:
          "http://images.prismic.io/bounce/37f8e1f8-7438-44ec-af68-2ff45dfb4be7_pedro-cambron-G8bOC9tzUfo-unsplash.jpg?auto=format,compress",
        imageInsideURL:
          "https://www.houstonfield.com/wp-content/uploads/2019/05/Minute-Maid-Park.jpg",
      },
      {
        name: "Kauffman Stadium",
        teamName: "Kansas City Royals",
        division: "American League Central",
        address: "1 Royal Way",
        city: "Kansas City",
        state: "MO",
        zipCode: 64129,
        capacity: 37903,
        openYear: 1973,
        imageOutsideURL:
          "http://npr.brightspotcdn.com/9b/9b/e4b503184fc9bc10f68091913b65/kauffman-26.jpg",
        imageInsideURL:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Kauffman2017.jpg/1200px-Kauffman2017.jpg",
      },
      {
        name: "Angel Stadium",
        teamName: "Los Angeles Angels",
        division: "American League West",
        address: "2000 E Gene Autry Way",
        city: "Anaheim",
        state: "CA",
        zipCode: 92806,
        capacity: 45050,
        openYear: 1966,
        imageOutsideURL:
          "http://watkinslandmark.com/wp-content/uploads/2017/10/angelsStadium.jpg",
        imageInsideURL:
          "https://upload.wikimedia.org/wikipedia/commons/4/4a/Angelstadiummarch2019.jpg",
      },
      {
        name: "Dodger Stadium",
        teamName: "Los Angeles Dodgers",
        division: "National League West",
        address: "1000 Vin Scully Ave",
        city: "Los Angeles",
        state: "CA",
        zipCode: 90012,
        capacity: 56000,
        openYear: 1962,
        imageOutsideURL:
          "https://cloudfront-us-east-2.images.arcpublishing.com/reuters/4GJ6BOKUCBORRFDQGYWM4UACBI.jpg",
        imageInsideURL:
          "https://cdn.vox-cdn.com/thumbor/0s4vgVtUydDdkjkTYXvSwQqnPrs=/194x0:5420x2736/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/9520505/Dodger_Stadium.jpg",
      },
      {
        name: "loanDepot Park",
        teamName: "Miami Marlins",
        division: "National League East",
        address: "501 Marlins Way",
        city: "Miami",
        state: "FL",
        zipCode: 33125,
        capacity: 37000,
        openYear: 2012,
        imageOutsideURL:
          "http://uni-engineer.com/wp-content/uploads/2021/07/marlins-slide-6.jpg",
        imageInsideURL:
          "https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w2208/mlb/sttvo7bwdvtjbqubstgx.jpg",
      },
      {
        name: "American Family Field",
        teamName: "Milwaukee Brewers",
        division: "National League Central",
        address: "1 Brewers Way",
        city: "Milwaukee",
        state: "WI",
        zipCode: 53214,
        capacity: 41900,
        openYear: 2001,
        imageOutsideURL:
          "https://media.bizj.us/view/img/11911195/amfam-stadium-sign-1*1200xx4418-2485-41-0.jpg",
        imageInsideURL:
          "https://i0.wp.com/www.perfuzion.com/wp-content/uploads/2021/05/051321-CardinalsBrewers13-scaled.jpg?ssl=1",
      },
      {
        name: "Target Field",
        teamName: "Minnesota Twins",
        division: "American League Central",
        address: "1 Twins Way",
        city: "Minneapolis",
        state: "MN",
        zipCode: 55403,
        capacity: 39504,
        openYear: 2010,
        imageOutsideURL:
          "https://i0.wp.com/circletocircle.blog/wp-content/uploads/2018/05/target_082311_ext1.jpg?ssl=1",
        imageInsideURL:
          "https://thebusinessdownload.com/wp-content/uploads/2022/08/j4u6qrngbjmg4amoqfhq.jpeg",
      },
      {
        name: "Citi Field",
        teamName: "New York Mets",
        division: "National League East",
        address: "41 Seaver Way",
        city: "Flushing",
        state: "NY",
        zipCode: 11368,
        capacity: 41922,
        openYear: 2009,
        imageOutsideURL:
          "https://populous.com/uploads/2018/01/CitiField_Populous.jpeg",
        imageInsideURL:
          "https://i0.wp.com/thesportsfanproject.com/wp-content/uploads/2023/07/citi-field-overview.jpg?resize=636%2C479&ssl=1",
      },
      {
        name: "Yankee Stadium",
        teamName: "New York Yankees",
        division: "American League East",
        address: "1 E 161st St",
        city: "Bronx",
        state: "NY",
        zipCode: 10451,
        capacity: 46537,
        openYear: 2009,
        imageOutsideURL:
          "https://pjmechanical.com/site/user/images/yankee_stadium.jpg",
        imageInsideURL:
          "https://www.newyorkbyrail.com/wp-content/uploads/2017/07/Yankee_Stadium__Bronx_NY__NYC__New_York_By_Rail.jpg",
      },
      {
        name: "Oakland Coliseum",
        teamName: "Oakland Athletics",
        division: "American League West",
        address: "7000 S Coliseum Way",
        city: "Oakland",
        state: "CA",
        zipCode: 94621,
        capacity: 63000,
        openYear: 1966,
        imageOutsideURL:
          "https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w2208/mlb/gq1j3kwwibteyx2n1eiy.jpg",
        imageInsideURL:
          "https://i.guim.co.uk/img/media/76e819dd799079089ae6fae61184a611a227c87d/0_264_5860_[…]ity=85&auto=format&fit=crop&s=64616131ae1f220e85f3e11e7d3bb652",
      },
      {
        name: "Citizens Bank Park",
        teamName: "Philadelphia Phillies",
        division: "National League East",
        address: "1 Citizens Bank Way",
        city: "Philadelphia",
        state: "PA",
        zipCode: 19148,
        capacity: 42901,
        openYear: 2004,
        imageOutsideURL:
          "https://mediaim.expedia.com/destination/2/560fd4121fe281de07cf0526e3f7151d.jpg",
        imageInsideURL:
          "https://i.etsystatic.com/6245917/r/il/54ad1a/2408162434/il_fullxfull.2408162434_3f5w.jpg",
      },
      {
        name: "PNC Park",
        teamName: "Pittsburgh Pirates",
        division: "National League Central",
        address: "115 Federal St",
        city: "Pittsburgh",
        state: "PA",
        zipCode: 15212,
        capacity: 38747,
        openYear: 2001,
        imageOutsideURL:
          "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/473000/473767-Pnc-Park.jpg",
        imageInsideURL:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Pittsburgh_Pirates_park_%28Un[…]sh%29.jpg/640px-Pittsburgh_Pirates_park_%28Unsplash%29.jpg",
      },
      {
        name: "Petco Park",
        teamName: "San Diego Padres",
        division: "National League West",
        address: "100 Park Blvd",
        city: "San Diego",
        state: "CA",
        zipCode: 92101,
        capacity: 42445,
        openYear: 2004,
        imageOutsideURL:
          "https://blog.ticketmaster.com/wp-content/uploads/step-inside-petco-park-1024x614.jpg",
        imageInsideURL:
          "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2022/08/1200/675/Petco.jpg?ve=1&tl=1",
      },
      {
        name: "Oracle Park",
        teamName: "San Francisco Giants",
        division: "National League West",
        address: "24 Willie Mays Plaza",
        city: "San Francisco",
        state: "CA",
        zipCode: 94107,
        capacity: 42300,
        openYear: 2000,
        imageOutsideURL:
          "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/475000/475766-San-Francisco-City.jpg",
        imageInsideURL:
          "https://www.mercurynews.com/wp-content/uploads/2020/07/SJM-L-GIANTS-0722-45.jpg?w=515",
      },
      {
        name: "T-Mobile Park",
        teamName: "Seattle Mariners",
        division: "American League West",
        address: "1250 1st Ave S",
        city: "Seattle",
        state: "WA",
        zipCode: 98134,
        capacity: 47943,
        openYear: 1999,
        imageOutsideURL:
          "https://images.axios.com/UPzZ4ha_l6bAS5Svrk3_sIgNVTE=/0x291:4128x2613/1920x1080/2024/08/15/1723681153647.jpg",
        imageInsideURL:
          "https://media.king5.com/assets/KING/images/e1411816-e373-43ae-b16d-94b74b2fc244/e1411816-e373-43ae-b16d-94b74b2fc244_1920x1080.jpg",
      },
      {
        name: "Busch Stadium",
        teamName: "St. Louis Cardinals",
        division: "National League Central",
        address: "700 Clark Ave",
        city: "St. Louis",
        state: "MO",
        zipCode: 63102,
        capacity: 46000,
        openYear: 2006,
        imageOutsideURL:
          "https://images.discotech.me/venue/1556/8ed4da47-9d26-413b-aa21-240823397194.jpg",
        imageInsideURL:
          "https://npr.brightspotcdn.com/dims4/default/0265f91/2147483647/strip/true/crop/3000x2000+0+0/resize/880x587!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F20%2F69%2F2627068e454080d5ebc82eb86ea4%2F033023-bm-cards-13.JPG",
      },
      {
        name: "Tropicana Field",
        teamName: "Tampa Bay Rays",
        division: "American League East",
        address: "1 Tropicana Dr",
        city: "St. Petersburg",
        state: "FL",
        zipCode: 33705,
        capacity: 42735,
        openYear: 1990,
        imageOutsideURL:
          "https://npr.brightspotcdn.com/dims4/default/164165e/2147483647/strip/true/crop/4032x3024+0+0/resize/880x660!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F47%2F85%2F31336f5a4211b6eeedb34fd2af32%2Ftropicana-field-exterior-gate-1.jpg",
        imageInsideURL:
          "https://nbcsports.brightspotcdn.com/dims4/default/3602dee/2147483647/strip/true/crop/8090x4551+0+5/resize/1440x810!/quality/90/?url=https%3A%2F%2Fnbc-sports-production-nbc-sports.s3.us-east-1.amazonaws.com%2Fbrightspot%2F65%2F72%2Fad08b442ef33c0dc6bddfd9bb5c6%2Fgettyimages-982397518-e1542223869990.jpg",
      },
      {
        name: "Globe Life Field",
        teamName: "Texas Rangers",
        division: "American League West",
        address: "734 Stadium Dr",
        city: "Arlington",
        state: "TX",
        zipCode: 76011,
        capacity: 40300,
        openYear: 2020,
        imageOutsideURL:
          "https://img.mlbstatic.com/mlb-images/image/private/t_4x1/t_w1536/mlb/ilvrq9o63imq1pxiujq5.jpg",
        imageInsideURL:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/GlobeLifeField2021.jpg/1200px-GlobeLifeField2021.jpg",
      },
      {
        name: "Rogers Centre",
        teamName: "Toronto Blue Jays",
        division: "American League East",
        address: "1 Blue Jays Way",
        city: "Toronto",
        state: "ON",
        zipCode: 11111,
        capacity: 49286,
        openYear: 1989,
        imageOutsideURL:
          "https://showoneproductions.ca/wp-content/uploads/2016/10/Rogers-Centre.jpg",
        imageInsideURL:
          "https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w1536/mlb/yqni9fpriindvjpbiy26.jpg",
      },
      {
        name: "Nationals Park",
        teamName: "Washington Nationals",
        division: "National League East",
        address: "1500 S Capitol St SE",
        city: "Washington",
        state: "DC",
        zipCode: 20003,
        capacity: 41546,
        openYear: 2008,
        imageOutsideURL:
          "https://baseballparks.com//images/Washington/WashNat1.jpg",
        imageInsideURL:
          "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fb2ea596c-eb94-42d4-9afa-98cbb5e2c0f3_2048x1105.jpeg",
      },
    ];
    await prisma.stadium.createMany({ data: stadiums });
  } catch (error) {
    console.error("Error creating stadiums:", error);
  }
};
// USERS
const createUsers = async () => {
  try {
    const users = [
      {
        username: "aliceuser",
        password: "password1",
        firstName: "Alice",
        lastName: "Smith",
        email: "alice@email.com",
      },
      {
        username: "bobuser",
        password: "password2",
        firstName: "Bob",
        lastName: "Smith",
        email: "bob@email.com",
      },
      {
        username: "charlieuser",
        password: "password3",
        firstName: "Charlie",
        lastName: "Smith",
        email: "charlie@email.com",
      },
      {
        username: "daveuser",
        password: "password4",
        firstName: "Dave",
        lastName: "Smith",
        email: "dave@email.com",
      },
      {
        username: "eveuser",
        password: "password5",
        firstName: "Eve",
        lastName: "Smith",
        email: "eve@email.com",
      },
      {
        username: "adminuser",
        password: "password6",
        firstName: "Ad",
        lastName: "Min",
        email: "admin@email.com",
        administrator: true,
      },
    ];

    // Hash passwords
    for (const user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    await prisma.user.createMany({ data: users });
    console.log("Users created successfully");
  } catch (error) {
    console.error("Error creating users:", error);
  }
};
// REVIEWS
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
// COMMENTS
const createComments = async () => {
  try {
    const comments = [
      { 
        content: "Average stadium and food sucked", 
        userId: 2, 
        reviewId: 1,
        date: new Date("2023-01-15") // Add the desired date here
      },
      { 
        content: "Great Stadium", 
        userId: 3, 
        reviewId: 2,
        date: new Date("2023-01-16")
      },
      { 
        content: "Will be coming back", 
        userId: 1, 
        reviewId: 3,
        date: new Date("2023-01-17")
      },
      { 
        content: "Seat was way too hard", 
        userId: 2, 
        reviewId: 4,
        date: new Date("2023-01-18")
      },
      { 
        content: "I thought I was going to a football game", 
        userId: 3, 
        reviewId: 5,
        date: new Date("2023-01-19")
      },
      { 
        content: "Hotdog was unreal, 10/10 recommended", 
        userId: 2, 
        reviewId: 6,
        date: new Date("2023-01-20")
      },
      { 
        content: "Go Padres!", 
        userId: 4, 
        reviewId: 1,
        date: new Date("2023-01-21")
      },
    ];
    await prisma.comment.createMany({ data: comments });
  } catch (error) {
    console.error("Error creating comments:", error);
  }
};

// VISITED STADIUMS
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
// RESTAURANTS
const createRestaurants = async () => {
  try {
    const restaurants = [
      // Chase Field restaurants
      {
        name: "Chico Malo",
        cuisine: "Mexican",
        address: "50 W Jefferson St",
        city: "Phoenix",
        state: "AZ",
        zipCode: 85003,
        stadiumId: 1,
      },
      {
        name: "The Arrogant Butcher",
        cuisine: "American",
        address: "2 E Jefferson St",
        city: "Phoenix",
        state: "AZ",
        zipCode: 85004,
        stadiumId: 1,
      },
      {
        name: "The Kettle Black Kitchen & Pub",
        cuisine: "American",
        address: "1 N 1st St",
        city: "Phoenix",
        state: "AZ",
        zipCode: 85004,
        stadiumId: 1,
      },
      // Truist Park restaurants
      {
        name: "Antico Pizza Battery Park",
        cuisine: "Italian",
        address: "2605 Circle 75 Pkwy",
        city: "Atlanta",
        state: "GA",
        zipCode: 30339,
        stadiumId: 2,
      },
      {
        name: "Battle & Brew - The Battery",
        cuisine: "American",
        address: "925 Battery Ave SE",
        city: "Atlanta",
        state: "GA",
        zipCode: 30339,
        stadiumId: 2,
      },
      {
        name: "The Juicy Crab",
        cuisine: "Seafood",
        address: "2524 Cobb Pkwy SE",
        city: "Smyrna",
        state: "GA",
        zipCode: 30080,
        stadiumId: 2,
      },
      // Camden Yards restaurants
      {
        name: "Faidley's Seafood",
        cuisine: "Seafood",
        address: "119 N Paca St",
        city: "Baltimore",
        state: "MD",
        zipCode: 21201,
        stadiumId: 3,
      },
      {
        name: "Connies Chicken & Waffles",
        cuisine: "Soul Food",
        address: "112 N Eutaw St",
        city: "Baltimore",
        state: "MD",
        zipCode: 21201,
        stadiumId: 3,
      },
      {
        name: "The Capital Grille",
        cuisine: "Steakhouse",
        address: "500 E Pratt St",
        city: "Baltimore",
        state: "MD",
        zipCode: 21202,
        stadiumId: 3,
      },
      // Fenway Park restaurants
      {
        name: "Tasty Burger",
        cuisine: "American",
        address: "86 Van Ness St",
        city: "Boston",
        state: "MA",
        zipCode: 0o2215,
        stadiumId: 4,
      },
      {
        name: "Sweet Cheeks Q",
        cuisine: "Barbecue",
        address: "1381 Boylston St",
        city: "Boston",
        state: "MA",
        zipCode: 0o2215,
        stadiumId: 4,
      },
      {
        name: "Bab Al-Yemen Boston",
        cuisine: "Middle Eastern",
        address: "468 Commonwealth Ave",
        city: "Boston",
        state: "MA",
        zipCode: 0o2215,
        stadiumId: 4,
      },
      // Wrigley Field restaurants
      {
        name: "Swift Tavern",
        cuisine: "American",
        address: "3600 N Clark St",
        city: "Chicago",
        state: "IL",
        zipCode: 60613,
        stadiumId: 5,
      },
      {
        name: "Old Crow Smokehouse",
        cuisine: "Barbecue",
        address: "3506 N Clark St",
        city: "Chicago",
        state: "IL",
        zipCode: 60657,
        stadiumId: 5,
      },
      {
        name: "Happy Camper Pizza",
        cuisine: "Pizza",
        address: "3458 N Clark St",
        city: "Chicago",
        state: "IL",
        zipCode: 60657,
        stadiumId: 5,
      },
      // Guaranteed Rate Field restaurants
      {
        name: "35th Street Red Hots",
        cuisine: "Hot Dogs",
        address: "500 W 35th St",
        city: "Chicago",
        state: "IL",
        zipCode: 60616,
        stadiumId: 6,
      },
      {
        name: "George's Gyros",
        cuisine: "Greek",
        address: "3445 S Halsted St",
        city: "Chicago",
        state: "IL",
        zipCode: 60608,
        stadiumId: 6,
      },
      {
        name: "Stix n Brix Pizza Cafe",
        cuisine: "Pizza",
        address: "218 W 33rd St",
        city: "Chicago",
        state: "IL",
        zipCode: 60616,
        stadiumId: 6,
      },
      // Great American Ball Park restaurants
      {
        name: "Moerlein Lager House",
        cuisine: "American",
        address: "115 Joe Nuxhall Way",
        city: "Cincinnati",
        state: "OH",
        zipCode: 45202,
        stadiumId: 7,
      },
      {
        name: "Condado Tacos",
        cuisine: "Mexican",
        address: "195 E Freedom Way",
        city: "Cincinnati",
        state: "OH",
        zipCode: 45202,
        stadiumId: 7,
      },
      {
        name: "Tast of Belgium - The Banks",
        cuisine: "Belgian",
        address: "16 W Freedom Way",
        city: "Cincinnati",
        state: "OH",
        zipCode: 45202,
        stadiumId: 7,
      },
      // Progressive Field restaurants
      {
        name: "Butcher and the Brewer",
        cuisine: "American",
        address: "2043 E 4th St",
        city: "Cleveland",
        state: "OH",
        zipCode: 44115,
        stadiumId: 8,
      },
      {
        name: "Southern Tier Brewing Cleveland",
        cuisine: "American",
        address: "811 Prospect Ave E",
        city: "Cleveland",
        state: "OH",
        zipCode: 44115,
        stadiumId: 8,
      },
      {
        name: "Mabel's BBQ",
        cuisine: "Barbecue",
        address: "2050 E 4th St",
        city: "Cleveland",
        state: "OH",
        zipCode: 44115,
        stadiumId: 8,
      },
      // Coors Field restaurants
      {
        name: "The Original - Denver",
        cuisine: "American",
        address: "1600 20th St",
        city: "Denver",
        state: "CO",
        zipCode: 80202,
        stadiumId: 9,
      },
      {
        name: "Marco's Coal Fired",
        cuisine: "Italian",
        address: "2129 Larimer St",
        city: "Denver",
        state: "CO",
        zipCode: 80205,
        stadiumId: 9,
      },
      {
        name: "Foraged - Denver",
        cuisine: "Sushi",
        address: "1825 Blake St",
        city: "Denver",
        state: "CO",
        zipCode: 80202,
        stadiumId: 9,
      },
      // Comerica Park restaurants
      {
        name: "The Staler French American Bistro",
        cuisine: "French-American",
        address: "313 Park Ave",
        city: "Detroit",
        state: "MI",
        zipCode: 48226,
        stadiumId: 10,
      },
      {
        name: "The Monarch Club",
        cuisine: "American",
        address: "33 John R St",
        city: "Detroit",
        state: "MI",
        zipCode: 48226,
        stadiumId: 10,
      },
      {
        name: "PAO Detroit - Modern Dining",
        cuisine: "Pan-Asian",
        address: "114 W Adams Ave",
        city: "Detroit",
        state: "MI",
        zipCode: 48226,
        stadiumId: 10,
      },
      // Minute Maid Park restaurants
      {
        name: "Vic & Anthony's Steakhouse - Houston",
        cuisine: "Steakhouse",
        address: "1510 Texas Ave",
        city: "Houston",
        state: "TX",
        zipCode: 77002,
        stadiumId: 11,
      },
      {
        name: "Potente",
        cuisine: "Italian",
        address: "1515 Texas Ave",
        city: "Houston",
        state: "TX",
        zipCode: 77002,
        stadiumId: 11,
      },
      {
        name: "Osso & Kristalla",
        cuisine: "Italian",
        address: "1515 Texas Ave",
        city: "Houston",
        state: "TX",
        zipCode: 77002,
        stadiumId: 11,
      },
      // Kauffman Stadium restaurants
      {
        name: "Cooper's Hawk Winery & Restaurant - Kansas City",
        cuisine: "American",
        address: "4686 Broadway Blvd",
        city: "Kansas City",
        state: "MO",
        zipCode: 64112,
        stadiumId: 12,
      },
      {
        name: "The Capital Grille",
        cuisine: "Steakhouse",
        address: "4760 Broadway Blvd",
        city: "Kansas City",
        state: "MO",
        zipCode: 64112,
        stadiumId: 12,
      },
      {
        name: "Lidia's Restaurant",
        cuisine: "Italian",
        address: "101 W 22nd St",
        city: "Kansas City",
        state: "MO",
        zipCode: 64108,
        stadiumId: 12,
      },
      // Angel Stadium restaurants
      {
        name: "The Ranch Restaurant",
        cuisine: "American",
        address: "1025 E Ball Rd",
        city: "Anaheim",
        state: "CA",
        zipCode: 92805,
        stadiumId: 13,
      },
      {
        name: "King's Fish House - Orange",
        cuisine: "Seafood",
        address: "1521 W Katella Ave",
        city: "Orange",
        state: "CA",
        zipCode: 92867,
        stadiumId: 13,
      },
      {
        name: "Puesto Anaheim",
        cuisine: "Mexican",
        address: "1040 W Katella Ave",
        city: "Anaheim",
        state: "CA",
        zipCode: 92802,
        stadiumId: 13,
      },
      // Dodger Stadium restaurants
      {
        name: "Perch LA",
        cuisine: "French",
        address: "448 S Hill St",
        city: "Los Angeles",
        state: "CA",
        zipCode: 90013,
        stadiumId: 14,
      },
      {
        name: "Bavel",
        cuisine: "Middle Eastern",
        address: "500 Mateo St",
        city: "Los Angeles",
        state: "CA",
        zipCode: 90013,
        stadiumId: 14,
      },
      {
        name: "Bestia",
        cuisine: "Italian",
        address: "2121 7th Pl",
        city: "Los Angeles",
        state: "CA",
        zipCode: 90021,
        stadiumId: 14,
      },
      // loanDepot Park restaurants
      {
        name: "CASA NEOS",
        cuisine: "Mediteranean",
        address: "40 SW North River Dr",
        city: "Miami",
        state: "FL",
        zipCode: 33130,
        stadiumId: 15,
      },
      {
        name: "Tanuki River Landing",
        cuisine: "Asian",
        address: "1420 NW N River Dr",
        city: "Miami",
        state: "FL",
        zipCode: 33125,
        stadiumId: 15,
      },
      {
        name: "Amara at Paraiso",
        cuisine: "Latin",
        address: "3101 NE 7th Ave",
        city: "Miami",
        state: "FL",
        zipCode: 33137,
        stadiumId: 15,
      },
      // American Family Field restaurants
      {
        name: "Story Hill BKC",
        cuisine: "American",
        address: "5100 W Bluemound Rd",
        city: "Milwaukee",
        state: "WI",
        zipCode: 53208,
        stadiumId: 16,
      },
      {
        name: "Oscar's Pub & Grill",
        cuisine: "American",
        address: "1712 W Pierce St",
        city: "Milwaukee",
        state: "WI",
        zipCode: 53204,
        stadiumId: 16,
      },
      {
        name: "Maxie's",
        cuisine: "Southern",
        address: "6732 W Fairview Ave",
        city: "Milwaukee",
        state: "WI",
        zipCode: 53213,
        stadiumId: 16,
      },
      // Target Field restaurants
      {
        name: "Hen House Eatery",
        cuisine: "American",
        address: "114 S 8th St",
        city: "Minneapolis",
        state: "MN",
        zipCode: 55402,
        stadiumId: 17,
      },
      {
        name: "Spoon and Stable",
        cuisine: "American",
        address: "211 N 1st St",
        city: "Minneapolis",
        state: "MN",
        zipCode: 55401,
        stadiumId: 17,
      },
      {
        name: "Bar La Grassa",
        cuisine: "Italian",
        address: "800 N Washington Ave",
        city: "Minneapolis",
        state: "MN",
        zipCode: 55401,
        stadiumId: 17,
      },
      // Citi Field restaurants
      {
        name: "Gyu-Kaku Japanese BBQ",
        cuisine: "Japanese",
        address: "40-52 Main St",
        city: "Flushing",
        state: "NY",
        zipCode: 11354,
        stadiumId: 18,
      },
      {
        name: "Rainhas Churrascaria",
        cuisine: "Brazilian Steakhouse",
        address: "108-01 Northern Blvd",
        city: "Corona",
        state: "NY",
        zipCode: 11368,
        stadiumId: 18,
      },
      {
        name: "La Cabaña",
        cuisine: "Dominican",
        address: "3917 103rd St",
        city: "Corona",
        state: "NY",
        zipCode: 11368,
        stadiumId: 18,
      },
      // Yankee Stadium restaurants
      {
        name: "Hook & Reel Cajun Seafood & Bar",
        cuisine: "Seafood",
        address: "236 E 161st St",
        city: "Bronx",
        state: "NY",
        zipCode: 10451,
        stadiumId: 19,
      },
      {
        name: "Court Deli",
        cuisine: "Deli",
        address: "96 E 161st St",
        city: "Bronx",
        state: "NY",
        zipCode: 10451,
        stadiumId: 19,
      },
      {
        name: "The Yankee Tavern",
        cuisine: "American",
        address: "72 E 161st St",
        city: "Bronx",
        state: "NY",
        zipCode: 10451,
        stadiumId: 19,
      },
      // Oakland Coliseum restaurants
      {
        name: "Bombera",
        cuisine: "Mexican",
        address: "3459 Champion St",
        city: "Oakland",
        state: "CA",
        zipCode: 94602,
        stadiumId: 20,
      },
      {
        name: "Speisekammer",
        cuisine: "German",
        address: "2424 Lincoln Ave",
        city: "Alameda",
        state: "CA",
        zipCode: 94501,
        stadiumId: 20,
      },
      {
        name: "Taqueria El Paisa",
        cuisine: "Mexican",
        address: "4610 International Blvd",
        city: "Oakland",
        state: "CA",
        zipCode: 94601,
        stadiumId: 20,
      },
      // Citizens Bank Park restaurants
      {
        name: "The Victor Café",
        cuisine: "Italian",
        address: "1303 Dickinson St",
        city: "Philadelphia",
        state: "PA",
        zipCode: 19147,
        stadiumId: 21,
      },
      {
        name: "The Dutch",
        cuisine: "American",
        address: "1527 S 4th St",
        city: "Philadelphia",
        state: "PA",
        zipCode: 19147,
        stadiumId: 21,
      },
      {
        name: "El Mezcal Cantina",
        cuisine: "Mexican",
        address: "1260 Point Breeze Ave",
        city: "Philadelphia",
        state: "PA",
        zipCode: 19146,
        stadiumId: 21,
      },
      // PNC Park restaurants
      {
        name: "Dish Osteria and Bar",
        cuisine: "Seafood",
        address: "128 S 17th St",
        city: "Pittsburgh",
        state: "PA",
        zipCode: 15203,
        stadiumId: 22,
      },
      {
        name: "Altius",
        cuisine: "American",
        address: "1230 Grandview Ave",
        city: "Pittsburgh",
        state: "PA",
        zipCode: 15211,
        stadiumId: 22,
      },
      {
        name: "Salem's Market & Grill",
        cuisine: "Middle Eastern",
        address: "2923 Penn Ave",
        city: "Pittsburgh",
        state: "PA",
        zipCode: 15201,
        stadiumId: 22,
      },
      // Petco Park restaurants
      {
        name: "The Lion's Share",
        cuisine: "American",
        address: "629 Kettner Blvd",
        city: "San Diego",
        state: "CA",
        zipCode: 92101,
        stadiumId: 23,
      },
      {
        name: "Hodad's",
        cuisine: "American",
        address: "945 Broadway",
        city: "San Diego",
        state: "CA",
        zipCode: 92101,
        stadiumId: 23,
      },
      {
        name: "Mitch's Seafood",
        cuisine: "Seafood",
        address: "1403 Scott St",
        city: "San Diego",
        state: "CA",
        zipCode: 92106,
        stadiumId: 23,
      },
      // Oracle Park restaurants
      {
        name: "Boulevard",
        cuisine: "American",
        address: "1 Mission St",
        city: "San Francisco",
        state: "CA",
        zipCode: 94105,
        stadiumId: 24,
      },
      {
        name: "House of Prime Rib",
        cuisine: "Steakhouse",
        address: "1906 Van Ness Ave",
        city: "San Francisco",
        state: "CA",
        zipCode: 94109,
        stadiumId: 24,
      },
      {
        name: "ROOFTOP 25",
        cuisine: "American",
        address: "25 Lusk St",
        city: "San Francisco",
        state: "CA",
        zipCode: 94107,
        stadiumId: 24,
      },
      // T-Mobile Park restaurants
      {
        name: "The Pink Door",
        cuisine: "Italian",
        address: "1919 Post Alley",
        city: "Seattle",
        state: "WA",
        zipCode: 98101,
        stadiumId: 25,
      },
      {
        name: "Elliott's Oyster House",
        cuisine: "Seafood",
        address: "1201 Alaskan Way",
        city: "Seattle",
        state: "WA",
        zipCode: 98101,
        stadiumId: 25,
      },
      {
        name: "The Crab Pot",
        cuisine: "Seafood",
        address: "1301 Alaskan Way",
        city: "Seattle",
        state: "WA",
        zipCode: 98101,
        stadiumId: 25,
      },
      // Busch Stadium restaurants
      {
        name: "Charlie Gitto's",
        cuisine: "Italian",
        address: "207 N 6th St",
        city: "St. Louis",
        state: "MO",
        zipCode: 63101,
        stadiumId: 26,
      },
      {
        name: "Broadway Oyster Bar",
        cuisine: "Seafood",
        address: "736 S Broadway",
        city: "St. Louis",
        state: "MO",
        zipCode: 63102,
        stadiumId: 26,
      },
      {
        name: "The Shaved Duck",
        cuisine: "Barbecue",
        address: "2900 Virginia Ave",
        city: "St. Louis",
        state: "MO",
        zipCode: 63118,
        stadiumId: 26,
      },
      // Tropicana Field restaurants
      {
        name: "Red Mesa Cantina",
        cuisine: "Mexican",
        address: "128 3rd St S",
        city: "St. Petersburg",
        state: "FL",
        zipCode: 33701,
        stadiumId: 27,
      },
      {
        name: "The Canopy",
        cuisine: "American",
        address: "340 Beach Dr NE",
        city: "St. Petersburg",
        state: "FL",
        zipCode: 33701,
        stadiumId: 27,
      },
      {
        name: "400 Beach Seafood & Tap House",
        cuisine: "Seafood",
        address: "400 Beach Dr NE",
        city: "St. Petersburg",
        state: "FL",
        zipCode: 33701,
        stadiumId: 27,
      },
      // Globe Life Field restaurants
      {
        name: "Texas Live!",
        cuisine: "American",
        address: "1650 E Rand St",
        city: "Arlington",
        state: "TX",
        zipCode: 76011,
        stadiumId: 28,
      },
      {
        name: "Pappadeaux Seafood Kitchen",
        cuisine: "Seafood",
        address: "1304 E Copeland Rd",
        city: "Arlington",
        state: "TX",
        zipCode: 76011,
        stadiumId: 28,
      },
      {
        name: "Prince Lebanese Grill",
        cuisine: "Middle Eastern",
        address: "502 W Rand St",
        city: "Arlington",
        state: "TX",
        zipCode: 76011,
        stadiumId: 28,
      },
      // Rogers Centre restaurants
      {
        name: "360 Restaurant",
        cuisine: "Canadian",
        address: "301 Front St W",
        city: "Toronto",
        state: "ON",
        zipCode: 11111,
        stadiumId: 29,
      },
      {
        name: "Canoe Restaurant & Bar",
        cuisine: "Canadian",
        address: "66 Wellington St W",
        city: "Toronto",
        state: "ON",
        zipCode: 11111,
        stadiumId: 29,
      },
      {
        name: "The Keg Steakhouse + Bar - Esplanade",
        cuisine: "Steakhouse",
        address: "26 The Esplanade",
        city: "Toronto",
        state: "ON",
        zipCode: 11111,
        stadiumId: 29,
      },
      // Nationals Park restaurants
      {
        name: "The Salt Line",
        cuisine: "Seafood",
        address: "79 Potomac Ave SE",
        city: "Washington",
        state: "DC",
        zipCode: 20003,
        stadiumId: 30,
      },
      {
        name: "Due South",
        cuisine: "Southern",
        address: "301 Water St SE",
        city: "Washington",
        state: "DC",
        zipCode: 20003,
        stadiumId: 30,
      },
      {
        name: "Osteria Morini",
        cuisine: "Italian",
        address: "301 Water St SE",
        city: "Washington",
        state: "DC",
        zipCode: 20003,
        stadiumId: 30,
      },
    ];
    await prisma.restaurant.createMany({ data: restaurants });
  } catch (error) {
    console.error("Error creating restaurants:", error);
  }
};
// HOTELS
const createHotels = async () => {
  try {
    const hotels = [
      // Chase Field hotels
      {
        name: "SpringHill Suites by Marriott Phoenix Downtown",
        address: "802 E Van Buren St",
        city: "Phoenix",
        state: "AZ",
        zipCode: 85006,
        stadiumId: 1,
      },
      {
        name: "Hyatt Regency Phoenix",
        address: "122 N 2nd St",
        city: "Phoenix",
        state: "AZ",
        zipCode: 85004,
        stadiumId: 1,
      },
      {
        name: "Courtyard by Marriott Phoenix Downtown",
        address: "132 S Central Ave",
        city: "Phoenix",
        state: "AZ",
        zipCode: 85004,
        stadiumId: 1,
      },
      // Truist Park hotels
      {
        name: "Omni Hotel at The Battery Atlanta",
        address: "2625 Circle 75 Pkwy",
        city: "Atlanta",
        state: "GA",
        zipCode: 30339,
        stadiumId: 2,
      },
      {
        name: "Hampton Inn & Suites Atlanta-Galleria",
        address: "2733 Circle 75 Pkwy",
        city: "Atlanta",
        state: "GA",
        zipCode: 30339,
        stadiumId: 2,
      },
      {
        name: "Sheraton Suites Galleria-Atlanta",
        address: "2844 Cobb Pkwy SE",
        city: "Atlanta",
        state: "GA",
        zipCode: 30339,
        stadiumId: 2,
      },
      // Camden Yards hotels
      {
        name: "Hyatt Regency Baltimore Inner Harbor",
        address: "300 Light St",
        city: "Baltimore",
        state: "MD",
        zipCode: 21202,
        stadiumId: 3,
      },
      {
        name: "Hilton Baltimore Inner Harbor",
        address: "401 W Pratt St",
        city: "Baltimore",
        state: "MD",
        zipCode: 21201,
        stadiumId: 3,
      },
      {
        name: "Royal Sonesta Harbor Court Baltimore",
        address: "550 Light St",
        city: "Baltimore",
        state: "MD",
        zipCode: 21202,
        stadiumId: 3,
      },
      // Fenway Park hotels
      {
        name: "Hotel Commonwealth",
        address: "500 Commonwealth Ave",
        city: "Boston",
        state: "MA",
        zipCode: 2215,
        stadiumId: 4,
      },
      {
        name: "The Verb Hotel",
        address: "1271 Boylston St",
        city: "Boston",
        state: "MA",
        zipCode: 2215,
        stadiumId: 4,
      },
      {
        name: "The Eliot Hotel",
        address: "370 Commonwealth Ave",
        city: "Boston",
        state: "MA",
        zipCode: 2215,
        stadiumId: 4,
      },
      // Wrigley Field hotels
      {
        name: "Hotel Zachary",
        address: "3630 N Clark St",
        city: "Chicago",
        state: "IL",
        zipCode: 60613,
        stadiumId: 5,
      },
      {
        name: "The Wheelhouse Hotel",
        address: "3475 N Clark St",
        city: "Chicago",
        state: "IL",
        zipCode: 60657,
        stadiumId: 5,
      },
      {
        name: "Hotel Versey",
        address: "644 W Diversey Pkwy",
        city: "Chicago",
        state: "IL",
        zipCode: 60614,
        stadiumId: 5,
      },
      // Guaranteed Rate Field hotels
      {
        name: "Chicago South Loop Hotel",
        address: "11 W 26th St",
        city: "Chicago",
        state: "IL",
        zipCode: 60616,
        stadiumId: 6,
      },
      {
        name: "Hilton Garden Inn Chicago McCormick Place",
        address: "123 E Cermak Rd",
        city: "Chicago",
        state: "IL",
        zipCode: 60616,
        stadiumId: 6,
      },
      {
        name: "Marriott Marquis Chicago",
        address: "2121 S Prairie Ave",
        city: "Chicago",
        state: "IL",
        zipCode: 60616,
        stadiumId: 6,
      },
      // Great American Ball Park hotels
      {
        name: "Renaissance Cincinnati Downtown Hotel",
        address: "36 E 4th St",
        city: "Cincinnati",
        state: "OH",
        zipCode: 45202,
        stadiumId: 7,
      },
      {
        name: "The Westin Cincinnati",
        address: "21 E 5th St",
        city: "Cincinnati",
        state: "OH",
        zipCode: 45202,
        stadiumId: 7,
      },
      {
        name: "AC Hotel by Marriott Cincinnati at The Banks",
        address: "135 Joe Nuxhall Way",
        city: "Cincinnati",
        state: "OH",
        zipCode: 45202,
        stadiumId: 7,
      },
      // Progressive Field hotels
      {
        name: "Hilton Cleveland Downtown",
        address: "100 Lakeside Ave E",
        city: "Cleveland",
        state: "OH",
        zipCode: 44114,
        stadiumId: 8,
      },
      {
        name: "Drury Plaza Hotel Cleveland Downtown",
        address: "1380 E 6th St",
        city: "Cleveland",
        state: "OH",
        zipCode: 44114,
        stadiumId: 8,
      },
      {
        name: "The Westin Cleveland Downtown",
        address: "777 Saint Clair Ave NE",
        city: "Cleveland",
        state: "OH",
        zipCode: 44114,
        stadiumId: 8,
      },
      // Coors Field hotels
      {
        name: "The Maven Hotel",
        address: "1850 Wazee St",
        city: "Denver",
        state: "CO",
        zipCode: 80202,
        stadiumId: 9,
      },
      {
        name: "The Rally Hotel at McGregor Square",
        address: "1600 20th St",
        city: "Denver",
        state: "CO",
        zipCode: 80202,
        stadiumId: 9,
      },
      {
        name: "Hotel Indigo Denver Downtown-Union Station, an IHG Hotel",
        address: "1801 Wewatta St",
        city: "Denver",
        state: "CO",
        zipCode: 80202,
        stadiumId: 9,
      },
      // Comerica Park hotels
      {
        name: "Shinola Hotel",
        address: "1400 Woodward Ave",
        city: "Detroit",
        state: "MI",
        zipCode: 48226,
        stadiumId: 10,
      },
      {
        name: "Atheneum Suite Hotel",
        address: "1000 Brush St",
        city: "Detroit",
        state: "MI",
        zipCode: 48226,
        stadiumId: 10,
      },
      {
        name: "Detroit Foundation Hotel",
        address: "250 W Larned St",
        city: "Detroit",
        state: "MI",
        zipCode: 48226,
        stadiumId: 10,
      },
      // Minute Maid Park hotels
      {
        name: "Le Méridien Houston Downtown",
        address: "1121 Walker St",
        city: "Houston",
        state: "TX",
        zipCode: 77002,
        stadiumId: 11,
      },
      {
        name: "Hampton Inn Houston Downtown",
        address: "710 Crawford St",
        city: "Houston",
        state: "TX",
        zipCode: 77002,
        stadiumId: 11,
      },
      {
        name: "Embassy Suites by Hilton Houston Downtown",
        address: "1515 Dallas St",
        city: "Houston",
        state: "TX",
        zipCode: 77010,
        stadiumId: 11,
      },
      // Kauffman Stadium hotels
      {
        name: "Best Western Plus Kansas City Sports Complex Hotel",
        address: "4011 Blue Ridge Cutoff",
        city: "Kansas City",
        state: "MO",
        zipCode: 64133,
        stadiumId: 12,
      },
      {
        name: "The Westin Kansas City at Crown Center",
        address: "1 E Pershing Rd",
        city: "Kansas City",
        state: "MO",
        zipCode: 64108,
        stadiumId: 12,
      },
      {
        name: "Loews Kansas City Hotel",
        address: "1515 Wyandotte St",
        city: "Kansas City",
        state: "MO",
        zipCode: 64108,
        stadiumId: 12,
      },
      // Angel Stadium hotels
      {
        name: "Hotel Fera Anaheim, a DoubleTree by Hilton",
        address: "100 The City Dr",
        city: "Orange",
        state: "CA",
        zipCode: 92868,
        stadiumId: 13,
      },
      {
        name: "Ayres Hotel Orange",
        address: "200 N The City Dr",
        city: "Orange",
        state: "CA",
        zipCode: 92868,
        stadiumId: 13,
      },
      {
        name: "Embassy Suites by Hilton Anaheim Orange",
        address: "400 N State College Blvd",
        city: "Orange",
        state: "CA",
        zipCode: 92868,
        stadiumId: 13,
      },
      // Dodger Stadium hotels
      {
        name: "Omni Los Angeles Hotel at California Plaza",
        address: "251 S Olive St",
        city: "Los Angeles",
        state: "CA",
        zipCode: 90012,
        stadiumId: 14,
      },
      {
        name: "DoubleTree by Hilton Hotel Los Angeles Downtown",
        address: "120 S Los Angeles St",
        city: "Los Angeles",
        state: "CA",
        zipCode: 90012,
        stadiumId: 14,
      },
      {
        name: "Sheraton Grand Los Angeles",
        address: "711 S Hope St",
        city: "Los Angeles",
        state: "CA",
        zipCode: 90017,
        stadiumId: 14,
      },
      // loanDepot Park hotels
      {
        name: "Miami Marriott Biscayne Bay",
        address: "1633 N Bayshore Dr",
        city: "Miami",
        state: "FL",
        zipCode: 33132,
        stadiumId: 15,
      },
      {
        name: "JW Marriott Marquis Miami",
        address: "1109 Brickell Ave",
        city: "Miami",
        state: "FL",
        zipCode: 33131,
        stadiumId: 15,
      },
      {
        name: "Kimpton EPIC Hotel",
        address: "270 Biscayne Blvd Way",
        city: "Miami",
        state: "FL",
        zipCode: 33131,
        stadiumId: 15,
      },
      // American Famnily Field hotels
      {
        name: "Fairfield Inn & Suites by Marriott Milwaukee West",
        address: "4229 W National Ave",
        city: "Milwaukee",
        state: "WI",
        zipCode: 53215,
        stadiumId: 16,
      },
      {
        name: "The Pfister Hotel",
        address: "424 E Wisconsin Ave",
        city: "Milwaukee",
        state: "WI",
        zipCode: 53202,
        stadiumId: 16,
      },
      {
        name: "Hyatt Regency Milwaukee",
        address: "333 W Kilbourn Ave",
        city: "Milwaukee",
        state: "WI",
        zipCode: 53203,
        stadiumId: 16,
      },
      // Target Field hotels
      {
        name: "Sonder at North Loop Green",
        address: "360 N 5th St",
        city: "Minneapolis",
        state: "MN",
        zipCode: 55401,
        stadiumId: 17,
      },
      {
        name: "Hampton Inn & Suites Minneapolis/Downtown",
        address: "19 N 8th St",
        city: "Minneapolis",
        state: "MN",
        zipCode: 55403,
        stadiumId: 17,
      },
      {
        name: "Embassy Suites by Hilton Minneapolis Downtown",
        address: "12 S 6th St",
        city: "Minneapolis",
        state: "MN",
        zipCode: 55402,
        stadiumId: 17,
      },
      // Citi Field hotels
      {
        name: "Starlight Hotel",
        address: "131-78 40th Rd",
        city: "Flushing",
        state: "NY",
        zipCode: 11354,
        stadiumId: 18,
      },
      {
        name: "Four Points by Sheraton Flushing",
        address: "33-68 Farrington St",
        city: "Queens",
        state: "NY",
        zipCode: 11354,
        stadiumId: 18,
      },
      {
        name: "Renaissance New York Flushing Hotel at Tangram",
        address: "133-36 37th Ave",
        city: "Flushing",
        state: "NY",
        zipCode: 11354,
        stadiumId: 18,
      },
      // Yankee Stadium hotels
      {
        name: "Wingate by Wyndham Bronx/Haven Park",
        address: "2568 Park Ave",
        city: "Bronx",
        state: "NY",
        zipCode: 10451,
        stadiumId: 19,
      },
      {
        name: "Opera House Hotel",
        address: "436 E 149th St",
        city: "Bronx",
        state: "NY",
        zipCode: 10455,
        stadiumId: 19,
      },
      {
        name: "Hyatt Place Fort Lee / George Washington Bridge",
        address: "2167 Route 4 East",
        city: "Fort Lee",
        state: "NJ",
        zipCode: 0o7024,
        stadiumId: 19,
      },
      // Oakland Coliseum hotels
      {
        name: "Waterfront Hotel - JDV by Hyatt",
        address: "10 Washington St",
        city: "Oakland",
        state: "CA",
        zipCode: 94607,
        stadiumId: 20,
      },
      {
        name: "Holiday Inn Express & Suites Oakland-Airport",
        address: "66 Airport Access Rd",
        city: "Oakland",
        state: "CA",
        zipCode: 94603,
        stadiumId: 20,
      },
      {
        name: "Courtyard by Marriott Oakland Airport",
        address: "350 Hegenberger Rd",
        city: "Oakland",
        state: "CA",
        zipCode: 94621,
        stadiumId: 20,
      },
      // Citizens Bank Park hotels
      {
        name: "Courtyard Philadelphia South at The Navy Yard",
        address: "1001 Intrepid Ave",
        city: "Philadelphia",
        state: "PA",
        zipCode: 19112,
        stadiumId: 21,
      },
      {
        name: "Kestrel Hotel",
        address: "1231 Wood St",
        city: "Philadelphia",
        state: "PA",
        zipCode: 19107,
        stadiumId: 21,
      },
      {
        name: "The Warwick Hotel Rittenhouse Square Philadelphia",
        address: "220 S 17th St",
        city: "Philadelphia",
        state: "PA",
        zipCode: 19103,
        stadiumId: 21,
      },
      // PNC Park hotels
      {
        name: "Hyatt Place Pittsburgh-North Shore",
        address: "260 N Shore Dr",
        city: "Pittsburgh",
        state: "PA",
        zipCode: 15212,
        stadiumId: 22,
      },
      {
        name: "Holiday Inn Express & Suites Pittsburgh North Shore, an IHG Hotel",
        address: "228 Federal St",
        city: "Pittsburgh",
        state: "PA",
        zipCode: 15212,
        stadiumId: 22,
      },
      {
        name: "Residence Inn Pittsburgh North Shore",
        address: "574 W General Robinson St",
        city: "Pittsburgh",
        state: "PA",
        zipCode: 15212,
        stadiumId: 22,
      },
      // Petco Park hotels
      {
        name: "San Diego Marriott Gaslamp Quarter",
        address: "660 K St",
        city: "San Diego",
        state: "CA",
        zipCode: 92101,
        stadiumId: 23,
      },
      {
        name: "Hilton San Diego Bayfront",
        address: "1 Park Blvd",
        city: "San Diego",
        state: "CA",
        zipCode: 92101,
        stadiumId: 23,
      },
      {
        name: "Hotel Indigo San Diego-Gaslamp Quarter, an IHG Hotel",
        address: "509 9th Ave",
        city: "San Diego",
        state: "CA",
        zipCode: 92101,
        stadiumId: 23,
      },
      // Oracle Park hotels
      {
        name: "Hyatt Place San Francisco",
        address: "701 3rd St",
        city: "San Francisco",
        state: "CA",
        zipCode: 94105,
        stadiumId: 24,
      },
      {
        name: "Hotel VIA",
        address: "138 King St",
        city: "San Francisco",
        state: "CA",
        zipCode: 94107,
        stadiumId: 24,
      },
      {
        name: "LUMA Hotel San Francisco",
        address: "100 Channel St",
        city: "San Francisco",
        state: "CA",
        zipCode: 94158,
        stadiumId: 24,
      },
      // T-Mobile Park hotels
      {
        name: "The Edgewater",
        address: "2411 Alaskan Way",
        city: "Seattle",
        state: "WA",
        zipCode: 98121,
        stadiumId: 25,
      },
      {
        name: "Thompson Seattle",
        address: "110 Stewart St",
        city: "Seattle",
        state: "WA",
        zipCode: 98101,
        stadiumId: 25,
      },
      {
        name: "The Charter Hotel Seattle, Curio Collection by Hilton",
        address: "1610 2nd Ave",
        city: "Seattle",
        state: "WA",
        zipCode: 98101,
        stadiumId: 25,
      },
      // Busch Stadium hotels
      {
        name: "The Westin St. Louis",
        address: "811 Spruce St",
        city: "St. Louis",
        state: "MO",
        zipCode: 63102,
        stadiumId: 26,
      },
      {
        name: "Drury Plaza Hotel St. Louis at the Arch",
        address: "2 S 4th St",
        city: "St. Louis",
        state: "MO",
        zipCode: 63102,
        stadiumId: 26,
      },
      {
        name: "Hilton St. Louis at the Ballpark",
        address: "1 S Broadway",
        city: "St. Louis",
        state: "MO",
        zipCode: 63102,
        stadiumId: 26,
      },
      // Tropicana Field hotels
      {
        name: "The Vinoy Renaissance St. Petersburg Resort & Golf Club",
        address: "501 5th Ave NE",
        city: "St. Petersburg",
        state: "FL",
        zipCode: 33701,
        stadiumId: 27,
      },
      {
        name: "Hollander Hotel",
        address: "421 4th Ave N",
        city: "St. Petersburg",
        state: "FL",
        zipCode: 33701,
        stadiumId: 27,
      },
      {
        name: "The Birchwood",
        address: "340 Beach Dr NE",
        city: "St. Petersburg",
        state: "FL",
        zipCode: 33701,
        stadiumId: 27,
      },
      // Globe Life Field hotels
      {
        name: "Aloft Dallas Arlington Entertainment District",
        address: "2140 E Lamar Blvd",
        city: "Arlington",
        state: "TX",
        zipCode: 76006,
        stadiumId: 28,
      },
      {
        name: "Live! by Loews - Arlington, TX",
        address: "1600 E Randol Mill Rd",
        city: "Arlington",
        state: "TX",
        zipCode: 76011,
        stadiumId: 28,
      },
      {
        name: "Hilton Arlington",
        address: "2401 E Lamar Blvd",
        city: "Arlington",
        state: "TX",
        zipCode: 76006,
        stadiumId: 28,
      },
      // Rogers Centre hotels
      {
        name: "Delta Hotels by Marriott Toronto",
        address: "75 Lower Simcoe St",
        city: "Toronto",
        state: "ON",
        zipCode: 11111,
        stadiumId: 29,
      },
      {
        name: "The Ritz-Carlton, Toronto",
        address: "181 Wellington St W",
        city: "Toronto",
        state: "ON",
        zipCode: 11111,
        stadiumId: 29,
      },
      {
        name: "The Fairmont Royal York",
        address: "100 Front St W",
        city: "Toronto",
        state: "ON",
        zipCode: 11111,
        stadiumId: 29,
      },
      // Nationals Park hotels
      {
        name: "Thompson Washington D.C.",
        address: "221 Tingey St SE",
        city: "Washington",
        state: "DC",
        zipCode: 20003,
        stadiumId: 30,
      },
      {
        name: "Canopy by Hilton Washington DC The Wharf",
        address: "975 7th St SW",
        city: "Washington",
        state: "DC",
        zipCode: 20024,
        stadiumId: 30,
      },
      {
        name: "InterContinental Washington D.C. - The Wharf",
        address: "801 Wharf St SW",
        city: "Washington",
        state: "DC",
        zipCode: 20024,
        stadiumId: 30,
      },
    ];
    await prisma.hotel.createMany({ data: hotels });
  } catch (error) {
    console.error("Error creating hotels:", error);
  }
};

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
