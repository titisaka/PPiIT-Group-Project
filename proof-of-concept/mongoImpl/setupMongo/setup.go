package setupmongo

import (
	"errors"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

var MongoClient *mongo.Client


func ConnectDatabase() error { 
	
	err := godotenv.Load(".env")
	if err != nil {
		return err
	}
	var uri string
	if uri = os.Getenv("MONGO_API_KEY"); uri == "" {
		return errors.New("EMPTY API KEY") 
	}

	serverApi := options.ServerAPI(options.ServerAPIVersion1)

	opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverApi)
	
	client , err := mongo.Connect(opts)	
	if err != nil {
		return err 
	}

	MongoClient = client	
	return nil
}
