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

//retrieve Eall documents from the items collection using the mongoClient api and returns it as JSON 
func GetAllItems() ([]byte, error) {

	var result []Item // this will hold the decoded "item" collection data from the mongo api
	
	//Setup bounds of api call(database, collection and filter(in this case none))
	collection := setupmongo.MongoClient.Database(db).Collection(coll) 
	cur, err := collection.Find(context.TODO(),bson.D{})
	if err != nil {
		fmt.Printf("Error retrieving collection:%v",err)
		return nil, err
	}
	
	//append all item documents to the Item array by appending in a for loop
	for cur.Next(context.TODO()) {
		var item Item
		err := cur.Decode(&item)
		if err != nil {
			fmt.Printf("Error decoding item: %v",err)
			return nil, err
		}
		result = append(result, item)
	}
	cur.Close(context.TODO())
	
	//convert the Item Array to byte array(JSON string)
	resultJSON, err  := json.MarshalIndent(result, "", "    ")	
	if err != nil {
		fmt.Printf("Error marshalling item array:%v", err)	
		return nil, err
	}

	return resultJSON, nil
}

func GetItemByName(name string) ([]byte, error) {

	var result Item 
	filter := bson.D{{"item-name", name}}
	collection := setupmongo.MongoClient.Database(db).Collection(coll) 

	err := collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		fmt.Printf("Could not retrieve item '%s':%s",name, err)	
		return nil, err
	}

	resultJSON , err := json.MarshalIndent(result, "", "    ")
	if err != nil {
		fmt.Printf("Error marshalling item array:%v", err)
		return nil, err
	}

	return resultJSON, nil
}

func InsertItem(item Item) (error) {
	return nil
}





