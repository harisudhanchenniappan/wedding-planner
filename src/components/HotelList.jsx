import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
//import Button from '@mui/material/Button';
//import Typography from '@mui/material/Typography';
import { Grid,Typography,AppBar ,Autocomplete,TextField, Button} from '@mui/material'
import { useParams } from 'react-router-dom';

const HotelList = ({location:urlLocation}) => {
   
    const hotel=urlLocation ? hotels[urlLocation.toLowerCase()] : hotels.chennai
    //console.log(hotel)
    
  return (
   <Grid container spacing={2} >
   

    {
        hotel.map((hotel,index)=>{
            const {name,image,description,rating}=hotel
            return (
                <Grid item lg={4} key={index} style={{marginTop:70}} >
                        <Card sx={{ maxWidth: 345 }} style={{paddingLeft:50}} >
                    <CardMedia
                    sx={{ height: 275 }}
                    image={image}
                    title="green iguana"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                       {name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {description}
                    </Typography>
                    <Typography>
                        rating:{rating}
                    </Typography>
                    </CardContent>
                    
                        </Card>

                </Grid>
               
            )
        })
    }
    
   </Grid>
   
  )
}

const hotels={
    chennai:[
        {
            name:'hoel a1',
            image:'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
            description:'Italian restaurent with tasty and delicious meal',
            rating:4
        },
        {
            name: 'Bella Pasta',
            image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/pasta-dish.jpg',
            description: 'Cozy Italian eatery serving fresh pasta and homemade sauces.',
            rating: 4.5
        },
        {
            name: 'La Trattoria',
            image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/pizza-oven.jpg',
            description: 'Authentic Italian pizza and classic dishes in a warm setting.',
            rating: 4.7
        },
        {
            name: 'Il Forno',
            image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/wood-fired-pizza.jpg',
            description: 'Wood-fired pizzas and artisan bread baked daily.',
            rating: 4.6
        },
        {
            name: 'Trattoria Romana',
            image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/gnocchi.jpg',
            description: 'Traditional Roman dishes with a modern twist.',
            rating: 4.4
        },
        {
            name: 'Pasta Fresca',
            image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/pasta-salad.jpg',
            description: 'Freshly made pasta paired with seasonal ingredients.',
            rating: 4.8
        },
        {
            name: 'Ristorante Napoli',
            image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/spaghetti.jpg',
            description: 'Seafood specialties and gourmet Italian cuisine.',
            rating: 4.5
        },
   ],

   mumbai:[
    {
        name: 'Vino e Cucina',
        image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/italian-dinner.jpg',
        description: 'Elegant dining with a vast selection of wines.',
        rating: 4.7
    },
    {
        name: 'Osteria da Luigi',
        image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/fresh-salad.jpg',
        description: 'Rustic atmosphere with homemade dishes and local ingredients.',
        rating: 4.6
    },
    {
        name: 'Sapori d’Italia',
        image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/italian-appetizers.jpg',
        description: 'Flavorful appetizers and gourmet pasta selections.',
        rating: 4.5
    },
    {
        name: 'Cucina Italiana',
        image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/risotto.jpg',
        description: 'A blend of traditional recipes and modern flavors.',
        rating: 4.4
    },
    {
        name: 'Pizzeria Italia',
        image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/pizza-slice.jpg',
        description: 'Famous for its thin crust and rich toppings.',
        rating: 4.6
    },
    {
        name: 'Mangia Bene',
        image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/salad-with-grilled-chicken.jpg',
        description: 'Delicious Italian meals with a focus on health.',
        rating: 4.5
    },
    {
        name: 'Il Giardino',
        image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/antipasto-platter.jpg',
        description: 'Garden-inspired dishes with fresh herbs and vegetables.',
        rating: 4.8
    },
    
   ],

   banglore:[
    {
        name: 'Pasta e Basta',
        image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/creamy-pasta.jpg',
        description: 'A pasta lover\'s paradise with diverse options.',
        rating: 4.7
    },
    {
        name: 'La Dolce Vita',
        image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/dessert-platter.jpg',
        description: 'Sweet desserts and coffee in a charming café.',
        rating: 4.6
    },
    {
        name: 'Bottega di Pasta',
        image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/ravioli.jpg',
        description: 'Specializes in handcrafted ravioli and sauces.',
        rating: 4.5
    },
    {
        name: 'Ristorante Toscana',
        image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/charcuterie-board.jpg',
        description: 'A taste of Tuscany with fine dining options.',
        rating: 4.7
    },
    {
        name: 'Caffe Italiano',
        image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/espresso.jpg',
        description: 'Perfect spot for coffee and light Italian bites.',
        rating: 4.5
    },
    {
        name: 'Trattoria dei Sogni',
        image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/pasta-with-pesto.jpg',
        description: 'Dreamy meals inspired by family recipes.',
        rating: 4.6
    },
    {
        name: 'Da Vinci Ristorante',
        image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/italian-dish.jpg',
        description: 'Modern Italian dining with an artistic flair.',
        rating: 4.8
    }
   ]
}

export default HotelList