package main

import (
	"api/handlers"
	"fmt"
	"net/http"
)

var mux = http.NewServeMux()

// ! Envvar
const port = 3030

func main() {

	// Set up the HTTP server

	fmt.Printf("Listening on port %d", port)
	mux.HandleFunc("/meals", handlers.GetMealsHandler)
	http.ListenAndServe(fmt.Sprintf(":%d", port), mux)
}
