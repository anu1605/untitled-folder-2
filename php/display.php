<!-- 
    pagination
 -->


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/style/display.css">
    <script>
        function submitRow() {

            document.getElementById('submit_rows').submit();
        }
    </script>
</head>

<body>
    <br>
    <form class="search_container" method="get" action="/php/display.php">
        <input type="search" name="search" class="search" id="search" value="" placeholder="search by name">
        <button type="submit" class="search-btn" id="search-btn" name="search-btn">Search</button>
    </form>
    <a class="clear_filter" href="/php/display.php">Clear Filter</a>

    <h1>Display Form Information</h1>
    <form id="submit_rows" action="/php/display.php" method="get">
        <label for="row_per_page">No. of rows:</label>
        <select onchange="submitRow()" name="rows" id="rows">
            <option <?php echo isset($_GET['rows']) && $_GET['rows'] == 3 ? 'selected' : ""; ?> value="3">3</option>
            <option <?php echo isset($_GET['rows']) && $_GET['rows'] == 5 ? 'selected' : ""; ?> value="5">5</option>
            <option <?php echo isset($_GET['rows']) && $_GET['rows'] == 8 ? 'selected' : ""; ?> value="8">8</option>
            <option <?php echo isset($_GET['rows']) && $_GET['rows'] == 10 ? 'selected' : ""; ?> value="10">10</option>
        </select>
    </form>
    <div class="preview">
        <?php

        // row_index
        if (isset($_GET['row_index']) && $_GET['row_index'] != "") {
            $row_index = $_GET['row_index'];
        } else $row_index = 0;


        // rows
        if (isset($_GET['rows']) && $_GET['rows'] != "") {
            $row_per_page = $_GET['rows'];
        } else $row_per_page = 3;
        ?>



        <table class="preview_table">
            <tr>
                <th class="main_data"> <a class="sort_anchor" href="/php/display.php?filter_item=firstname&switch=<?php echo isset($_GET['switch']) && $_GET['switch'] == 1 ? 0 : 1 ?>&row_index=<?php echo $row_index ?>&search=<?php echo isset($_GET['search']) ? $_GET['search'] : ""; ?>&rows=<?php echo isset($_GET['rows']) ? $_GET['rows'] : 3; ?>">firstname</a> </th>
                <th class="main_data"><a class="sort_anchor" href="/php/display.php?filter_item=lastname&switch=<?php echo isset($_GET['switch']) && $_GET['switch'] == 1 ? 0 : 1 ?>&row_index=<?php echo $row_index ?>&search=<?php echo isset($_GET['search']) ? $_GET['search'] : ""; ?>&rows=<?php echo isset($_GET['rows']) ? $_GET['rows'] : 3; ?>">lastname</a></th>
                <th class="main_data"><a class="sort_anchor" href="/php/display.php?filter_item=email&switch=<?php echo isset($_GET['switch']) && $_GET['switch'] == 1 ? 0 : 1 ?>&row_index=<?php echo $row_index ?>&search=<?php echo isset($_GET['search']) ? $_GET['search'] : ""; ?>&rows=<?php echo isset($_GET['rows']) ? $_GET['rows'] : 3; ?>">email</a></th>
                <th class="main_data">gender</th>
                <th class="main_data">hobbies</th>
                <th class="main_data">subject</th>
                <th class="main_data">about_yourself</th>
                <th class="main_data">image_files</th>
                <th class="main_data"><a class="sort_anchor" href="/php/display.php?filter_item=date&switch=<?php echo isset($_GET['switch']) && $_GET['switch'] == 1 ? 0 : 1 ?>&row_index=<?php echo $row_index ?>&search=<?php echo isset($_GET['search']) ? $_GET['search'] : ""; ?>&rows=<?php echo isset($_GET['rows']) ? $_GET['rows'] : 3; ?>">date</a></th>
                <th class="main_data"><a class="sort_anchor" href="/php/display.php?filter_item=edited_at&switch=<?php echo isset($_GET['switch']) && $_GET['switch'] == 1 ? 0 : 1 ?>&row_index=<?php echo $row_index ?>&search=<?php echo isset($_GET['search']) ? $_GET['search'] : ""; ?>&rows=<?php echo isset($_GET['rows']) ? $_GET['rows'] : 3; ?>">edited_at</a></th>
                <th class="main_data">Uploaded_Images</th>
                <th class="main_data">Action</th>
            </tr>

            <tr>
                <?php
                include dirname(__FILE__, 2) . "/" . "php/" . "connectConfig.php";
                if (isset($_GET['ID']) &&  $_GET['ID'] != "") {
                    $main_ID = $_GET['ID'];
                    $delete_main = mysqli_query($conn, "DELETE FROM table_form WHERE post_id = $main_ID");
                    // if ($delete_main) {
                    //     header("location: /php/display.php") . $_GET['rows'];
                    //     die();
                    // }
                }



                if (isset($_GET['search']) &&  $_GET['search'] != "") {
                    $searched_item = $_GET['search'];
                    if (isset($_GET['filter_item']) &&  $_GET['filter_item'] != "") {
                        $filter_item = $_GET['filter_item'];
                        $switch = $_GET['switch'];
                        if (isset($_GET['switch']) &&  $_GET['switch'] != "") {

                            if ($switch === '1') {
                                $query = $conn->query("SELECT * FROM table_form  WHERE firstname LIKE '%$searched_item%' OR lastname LIKE '%$searched_item%' OR email LIKE '%$searched_item%' OR hobbies LIKE '%$searched_item%' OR subject LIKE '%$searched_item%' or date LIKE '%$searched_item%' ORDER BY $filter_item DESC LIMIT $row_index,$row_per_page");
                            } else if ($switch === '0') {
                                $query = $conn->query("SELECT * FROM table_form  WHERE firstname LIKE '%$searched_item%' OR lastname LIKE '%$searched_item%' OR email LIKE '%$searched_item%' OR hobbies LIKE '%$searched_item%' OR subject LIKE '%$searched_item%' or date LIKE '%$searched_item%' ORDER BY $filter_item ASC LIMIT $row_index,$row_per_page");
                            }
                        }
                    } else $query = $conn->query("SELECT * FROM table_form  WHERE firstname LIKE '%$searched_item%' OR lastname LIKE '%$searched_item%' OR email LIKE '%$searched_item%' OR hobbies LIKE '%$searched_item%' OR subject LIKE '%$searched_item%' or date LIKE '%$searched_item%' LIMIT $row_index,$row_per_page");
                } else if (isset($_GET['filter_item']) &&  $_GET['filter_item'] != "") {
                    $filter_item = $_GET['filter_item'];
                    $switch = $_GET['switch'];

                    if (isset($_GET['switch']) &&  $_GET['switch'] != "")
                        if ($switch === '1') {
                            $query = $conn->query("SELECT * FROM table_form  ORDER BY $filter_item DESC LIMIT $row_index,$row_per_page ");
                        } else if ($switch === '0') {
                            $query = $conn->query("SELECT * FROM table_form  ORDER BY $filter_item ASC LIMIT $row_index,$row_per_page");
                        }
                } else
                    $query = $conn->query("SELECT * FROM table_form LIMIT $row_index,$row_per_page");

                if (isset($_GET['search']) &&  $_GET['search'] != "")
                    $numRow = mysqli_num_rows($conn->query("SELECT * FROM table_form  WHERE firstname LIKE '%$searched_item%' OR lastname LIKE '%$searched_item%' OR email LIKE '%$searched_item%' OR hobbies LIKE '%$searched_item%' OR subject LIKE '%$searched_item%' or date LIKE '%$searched_item%'"));
                else
                    $numRow = mysqli_num_rows($conn->query("SELECT * FROM table_form"));



                if ($query->num_rows > 0) {
                    while ($row = $query->fetch_assoc()) {
                ?>
                        <td> <?php echo $row['firstname']; ?> </td>
                        <td> <?php echo $row['lastname']; ?> </td>
                        <td> <?php echo $row['email']; ?> </td>
                        <td> <?php echo $row['gender']; ?> </td>
                        <td> <?php echo $row['hobbies']; ?> </td>
                        <td> <?php echo $row['subject']; ?> </td>
                        <td> <?php echo $row['about_yourself']; ?> </td>
                        <td> <?php echo $row['image_files']; ?> </td>
                        <td> <?php echo $row['date']; ?> </td>
                        <td> <?php echo date("d-M-Y h:ia", strtotime($row['edited_at'])); ?> </td>
                        <td class="image_column">
                            <?php
                            $array = explode(',', $row['image_files']);
                            for ($i = 0; $i < count($array) - 1; $i++) {
                                $filename = $array[$i];
                                echo '<img style = "width : 10rem; padding: 0 0.5rem" src="../upload-images/'  . $filename . '"><br>';
                            }
                            ?>
                        </td>

                        <td>
                            <div class="action_btn">
                                <a onclick="return confirm('Press OK to delete or Cancel button')" href="/php/display.php?ID=<?php echo $row['post_id']; ?>&rows=<?php echo isset($_GET['rows']) ? $_GET['rows'] : 3; ?>">Delete</a>
                                <a onclick="return confirm('Press OK to edit or Cancel button')" href="/index.php?ID=<?php echo $row['post_id']; ?>&rows=<?php echo isset($_GET['rows']) ? $_GET['rows'] : 3; ?>">Edit</a>
                            </div>
                        </td>

            </tr>
    <?php }
                } ?>


        </table>



    </div>
    <table class="pagination_container">
        <tbody class="pagination_body">
            <tr class="pagination_row">
                <td class="pagination_cell page_no">Page No:</td>
            </tr>
            <?php
            if ($numRow % $row_per_page == 0) {
                if ($numRow > $row_per_page)
                    $no_of_pages = intdiv($numRow, $row_per_page);
                else $no_of_pages = 1;
            } else {
                if ($numRow > $row_per_page)
                    $no_of_pages = intdiv($numRow, $row_per_page) + 1;
                else $no_of_pages = 1;
            }
            for ($i = 1; $i <= $no_of_pages; $i++) {
                if ($i == 0)
                    $index = 0;
                else $index = ($i - 1) * $row_per_page;
            ?>
                <tr class="pagination_row">
                    <td class="pagination_cell"><a class="sort_anchor pagination_anchor" href="/php/display.php?row_index=<?php echo $index ?>&search=<?php echo isset($_GET['search']) ? $_GET['search'] : ""; ?>&rows=<?php echo isset($_GET['rows']) ? $_GET['rows'] : 3; ?>&filter_item=<?php echo  isset($_GET['filter_item']) ? $_GET['filter_item'] : ""; ?>&switch=<?php echo isset($_GET['switch']) ? $_GET['switch'] : 1 ?>"><?php echo $i; ?></a></td>
                </tr>
            <?php
            }
            ?>

        </tbody>
    </table>


    <?php
    include dirname(__FILE__, 2) . "/" . "php/" . "display_qualification.php";
    include dirname(__FILE__, 2) . "/" . "php/" . "pagination.php";
    ?>
</body>

</html>