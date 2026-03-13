package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/PPiIT-Group-Project/models/warehouse"
	"github.com/PPiIT-Group-Project/setupMongo"
)

func main() {
	
	router := http.NewServeMux()

	//retrieve all item documents from items collection
	router.HandleFunc("GET /items", func(w http.ResponseWriter, r *http.Request) {

		//Attempt to retrieve all available documents as JSON byte array
		jsonData, err := warehouse.GetAllItems()
		if err != nil {
			fmt.Printf("retrieval error:%v",err)
			http.Error(w, err.Error(), 500)
		} else {
			w.Write(jsonData)
		}
	})

	//retrieve single item document from items collection using the name field to search
	router.HandleFunc("GET /item/{name}", func(w http.ResponseWriter, r *http.Request) {
		
		name := r.PathValue("name")
		//Attempt to retrieve document as JSON byte array
		jsonData, err := warehouse.GetItemByName(name)
		if err != nil {
			fmt.Printf("retrieval error:%v",err)
			http.Error(w, err.Error(), 500)
		} else {
			w.Write(jsonData)
		} 
	}) 

	//Insert new Item into items collection
	router.HandleFunc("POST /item/add", func(w http.ResponseWriter, r *http.Request) { 
		//convert body of http request to Item object
		var item warehouse.Item 
		err := json.NewDecoder(r.Body).Decode(&item) 
		if err != nil { 
			fmt.Printf("json conversion error:%v",err) 
			http.Error(w, err.Error(), 500)
			return
		}
		
		//attempt to insert item object as document into database
		err = warehouse.InsertItem(item)
		if err != nil {	
			fmt.Printf("json conversion error:%v",err)
			http.Error(w, err.Error(), 500)
		} else {
			w.Write([]byte("successfully added item:" + item.ItemName))
		}
	})

	//replace/edit existing item in the items collection	
	router.HandleFunc("PUT /item/add/{name}",func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(404) // TODO: define service logic for editing/replacing a document in the items collection
	})
	
	err := setupmongo.ConnectDatabase()
	if err != nil {
		log.Fatalf("Error Database connection attempt failed:%s",err)
	}

	server := http.Server{
		Addr: ":8080",
		Handler: router,
	}

	log.Println("Starting server on port :8080")
	server.ListenAndServe()
}
