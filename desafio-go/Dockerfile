FROM golang:alpine AS builder
WORKDIR /app
COPY . .
RUN go mod init fullcycle && go mod tidy
RUN go build -o main .

FROM scratch
COPY --from=builder /app/main /app/main
CMD ["/app/main"]