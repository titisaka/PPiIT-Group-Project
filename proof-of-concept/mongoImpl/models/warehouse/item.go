package warehouse

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/PPiIT-Group-Project/setupMongo"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

//Go Object model of the expected document structure of document in the items collection
//This is used to convert the recieved BSON strings from the mongo api into JSON byte arrays
type Item struct {
	ItemName 	string	`json:"item-name",bson:"item-name"`
	Price 		float32	`json:"price",bson:"price"`
	Barcode 	string	`json:"barcode",bson:barcode"`
	Vendor 		string	`json:"vendor",bson:"vendor"`
}


//collection and database identifier strings
const coll = "items"
const db = "warehouse"
var collection *mongo.Database

//Service logic functions for interactin with the items collection in the mongdb cloud database

func GetAllItems() ([]byte, error) {

	var result []Item // this will hold the decoded "item" collection data from the mongo api	
	collection := setupmongo.MongoClient.Database(db).Collection(coll) // initialise collection

	cur, err := collection.Find(context.TODO(),bson.D{}) // initialise database cursor to read multiple documents in a collection(similar in implementation to a file reader)
	if err != nil {
		fmt.Printf("Error retrieving collection:%v",err)
		return nil, err
	}
	
	for cur.Next(context.TODO()) { // append all item documents to the Item array by appending in a for loop
		var item Item
		err := cur.Decode(&item)
		if err != nil {
			fmt.Printf("Error decoding item: %v",err)
			return nil, err
		}

		result = append(result, item)
	}
	cur.Close(context.TODO())
	
	resultJSON, err  := json.MarshalIndent(result, "", "    ") // convert the Item Array to byte array(JSON string)
	if err != nil {
		fmt.Printf("Error marshalling item array:%v", err)	
		return nil, err
	}

	return resultJSON, nil
}

func GetItemByName(name string) ([]byte, error) {

	var result Item // this holds the decoded document as Item variable
	filter := bson.D{{"item-name", name}} //query filter that narrows search down to document with matching name field
	collection := setupmongo.MongoClient.Database(db).Collection(coll) // collection scope initialisation

	err := collection.FindOne(context.TODO(), filter).Decode(&result) // attempt to retrieve document and assign its decoded value to the result variable
	if err != nil {
		fmt.Printf("Could not retrieve item '%s':%s",name, err)	
		return nil, err
	}
	
	resultJSON , err := json.MarshalIndent(result, "", "    ") //convert the result to a JSON byte array
	if err != nil {
		fmt.Printf("Error marshalling item array:%v", err)
		return nil, err
	}

	return resultJSON, nil //success
}

func InsertItem(item Item) (error) { 

	collection := setupmongo.MongoClient.Database(db).Collection(coll)
	
	result, err := collection.InsertOne(context.TODO(),item)
	if err != nil {
		return err
	}
	
	fmt.Printf("Item successfully added with ID:%s\n", result.InsertedID) 

	return nil 
}

func EditItem(name string,item Item) (error) {
	return nil
}






