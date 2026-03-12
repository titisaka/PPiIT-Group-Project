package warehouse

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/PPiIT-Group-Project/setupMongo"
	"go.mongodb.org/mongo-driver/v2/bson"
)

type Item struct {
	ItemName 	string	`json:"item-name",bson:"item-name"`
	Price 		float32	`json:"price",bson:"price"`
	Barcode 	string	`json:"barcode",bson:barcode"`
	Vendor 		string	`json:"vendor",bson:"vendor"`
}

const coll = "items"
const db = "warehouse"

//retrieves all documents from the items collection using the mongoClient api and returns it as JSON 
func GetAllItems() ([]byte, error) {
	
	var result []Item // this will hold the decoded "item" collection data from the mongo api
	
	//Setup bounds of api call(database, collection and filter(in this case none))
	collection := setupmongo.MongoClient.Database(db).Collection(coll) 
	cur, err := collection.Find(context.TODO(),bson.D{})
	if err != nil {
		fmt.Printf("Error retrieving collection:%v",err)
		return nil, err
	}

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
	resultJSON, err  := json.MarshalIndent(result, "", "    ")	
	if err != nil {
		fmt.Printf("Error marshalling item array:%v", err)	
		return nil, err
	}

	return resultJSON, nil
}
