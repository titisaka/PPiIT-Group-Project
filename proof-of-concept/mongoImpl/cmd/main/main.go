package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/PPiIT-Group-Project/models/warehouse"
	"github.com/PPiIT-Group-Project/setupMongo"
)

func main() {
	
	router := http.NewServeMux()

	router.HandleFunc("GET /items", func(w http.ResponseWriter, r *http.Request) {
		jsonData, err := warehouse.GetAllItems()
		if err != nil {
			fmt.Printf("retrieval error:%v",err)
			http.Error(w, err.Error(), 500)
		} else {
			w.Write(jsonData)
		}
	})

	router.HandleFunc("GET /item/{name}", func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(404)
	})
	
	router.HandleFunc("PUT /item/add", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(404)
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
