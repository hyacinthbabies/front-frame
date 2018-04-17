import React from "react"
import {Input,List, Avatar,Spin,Icon} from "antd";
import ApiUtil from "utils/ApiUtil";
import "./style.less";
import { withRouter } from 'react-router'
import {getMenuKeys} from "common/menuUtils";

const Search = Input.Search;

class Reading extends React.Component {
  state = {
  }

  componentDidMount(){
    // let loadedImages = 0, // Counter for loaded images
          // $progressBar = $('.progress-bar'),
          // tileCount = 30,
     let   $container = $("#container"),
     $window = $(window),
     $document = $(document),  
     wookmark;

    // for (let i = 0; i < tileCount; i++) {
    //   let newItemHtml = '<li class="tile-loading"><img src="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=e5127fe0db09b3deffb2ec2ba4d606f4/9d82d158ccbf6c813356f460b63eb13532fa40d1.jpg"><p>' + (1 + i) + '</p></li>';
    //   $('#container').append(newItemHtml);
    // }
    // Init lightbox
    $('#container').magnificPopup({
        delegate: 'li:not(.wookmark-inactive) a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    // Call the layout function after all images have loaded
    imagesLoaded('#container', function () {
        wookmark = new Wookmark('#container', {
            offset: 10, // Optional, the distance between grid items
            outerOffset: 10,
            itemWidth: 210 // Optional, the width of a grid item
        });
    });

    // $('#container').imagesLoaded()
    //     .always(function () {
    //       $progressBar.hide();
    //     })
    //     .progress(function (instance, image) {
    //       // Update progress bar after each image has loaded and remove loading state
    //       $(image.img).closest('li').removeClass('tile-loading');
    //       $progressBar.css('width', (++loadedImages / tileCount * 100) + '%');
    //       wookmark.updateOptions();
    //     });

    /**
     * When scrolled all the way to the bottom, add more tiles
     */
    function onScroll() {
      // Check if we're within 100 pixels of the bottom edge of the broser window.
      var winHeight = window.innerHeight ? window.innerHeight : $window.height(), // iphone fix
          closeToBottom = ($window.scrollTop() + winHeight > $document.height() - 100);

      if (closeToBottom) {
        // Get the first then items from the grid, clone them, and add them to the bottom of the grid
        var $items = $('li', $container),
            $firstTen = $items.slice(0, 10).clone().css('opacity', 0);
        $container.append($firstTen);

        wookmark.initItems();
        wookmark.layout(true, function () {
          // Fade in items after layout
          setTimeout(function() {
            $firstTen.css('opacity', 1);
          }, 300);
        });
      }
    };

    // Capture scroll event.
    $window.bind('scroll.wookmark', onScroll);

    // Setup filter buttons when jQuery is available
    let $filters = $('#filters li');

    /**
     * When a filter is clicked, toggle it's active state and refresh.
     */
    function onClickFilter(e) {
      var $item = $(e.currentTarget),
          activeFilters = [],
          filterType = $item.data('filter');

      if (filterType === 'all') {
        $filters.removeClass('active');
      } else {
        $item.toggleClass('active');

        // Collect active filter strings
        $filters.filter('.active').each(function() {
          activeFilters.push($(this).data('filter'));
        });
      }

      wookmark.filter(activeFilters, 'or');
    }

    // Capture filter click events.
    $('#filters').on('click.wookmark-filter', 'li', onClickFilter);
  }

  render() {
    return (
        <div role="main" className="photo_container">
        <ol id="filters">
          <li data-filter="all">Reset filters</li>
          <li data-filter="amsterdam">Amsterdam</li>
          <li data-filter="tokyo">Tokyo</li>
          <li data-filter="london">London</li>
          <li data-filter="paris">Paris</li>
          <li data-filter="berlin">Berlin</li>
          <li data-filter="sport">Sport</li>
          <li data-filter="fashion">Fashion</li>
          <li data-filter="video">Video</li>
          <li data-filter="art">Art</li>
        </ol>
          <ul id="container" className="tiles-wrap animated">
            <li data-filter-class='["london", "art"]'>
              <a href="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=e5127fe0db09b3deffb2ec2ba4d606f4/9d82d158ccbf6c813356f460b63eb13532fa40d1.jpg">
                <img src="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=e5127fe0db09b3deffb2ec2ba4d606f4/9d82d158ccbf6c813356f460b63eb13532fa40d1.jpg" width="200" height="283"/>
              </a>
              <p>1</p>
            </li>
            <li data-filter-class='["london", "art"]'>
              <a href={require("images/nrb.png")}>
                <img src={require("images/nrb.png")} width="100" height="300"/>
              </a>
              <p>1</p>
            </li>
            <li data-filter-class='["berlin", "art"]'>
              <a href="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=e5127fe0db09b3deffb2ec2ba4d606f4/9d82d158ccbf6c813356f460b63eb13532fa40d1.jpg">
                <img src="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=e5127fe0db09b3deffb2ec2ba4d606f4/9d82d158ccbf6c813356f460b63eb13532fa40d1.jpg" width="200" height="283"/>
              </a>
              <p>1</p>
            </li>
            <li>
              <a href="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=e5127fe0db09b3deffb2ec2ba4d606f4/9d82d158ccbf6c813356f460b63eb13532fa40d1.jpg">
                <img src="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=e5127fe0db09b3deffb2ec2ba4d606f4/9d82d158ccbf6c813356f460b63eb13532fa40d1.jpg" width="200" height="283"/>
              </a>
              <p>1</p>
            </li>
            <li>
              <a href={require("images/nrb.png")}>
                <img src={require("images/nrb.png")} width="100" height="300"/>
              </a>
              <p>1</p>
            </li>
            <li>
              <a href="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=e5127fe0db09b3deffb2ec2ba4d606f4/9d82d158ccbf6c813356f460b63eb13532fa40d1.jpg">
                <img src="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=e5127fe0db09b3deffb2ec2ba4d606f4/9d82d158ccbf6c813356f460b63eb13532fa40d1.jpg" width="200" height="283"/>
              </a>
              <p>1</p>
            </li>
            <li>
              <a href={require("images/full/1.jpg")}>
                <img src={require("images/full/1.jpg")} width="150" height="183"/>
              </a>
              <p>1</p>
            </li>
            <li>
              <a href="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=e5127fe0db09b3deffb2ec2ba4d606f4/9d82d158ccbf6c813356f460b63eb13532fa40d1.jpg">
                <img src="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=e5127fe0db09b3deffb2ec2ba4d606f4/9d82d158ccbf6c813356f460b63eb13532fa40d1.jpg" width="200" height="283"/>
              </a>
              <p>我试试少时诵诗书所所所所所所所所所所所少时诵诗书所所所所所所 少时诵诗书所</p>
            </li>
            <li>
              <a href={require("images/nrb.png")}>
                <img src={require("images/nrb.png")} width="200" height="283"/>
              </a>
              <p>1</p>
            </li>
            <li>
              <a href="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=e5127fe0db09b3deffb2ec2ba4d606f4/9d82d158ccbf6c813356f460b63eb13532fa40d1.jpg">
                <img src="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=e5127fe0db09b3deffb2ec2ba4d606f4/9d82d158ccbf6c813356f460b63eb13532fa40d1.jpg" width="200" height="283"/>
              </a>
              <p>1</p>
            </li>
            <li>
              <a href={require("images/full/1.jpg")}>
                <img src={require("images/full/1.jpg")} width="150" height="183"/>
              </a>
              <p>1</p>
            </li>
            <li>
              <a href="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=e5127fe0db09b3deffb2ec2ba4d606f4/9d82d158ccbf6c813356f460b63eb13532fa40d1.jpg">
                <img src="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=e5127fe0db09b3deffb2ec2ba4d606f4/9d82d158ccbf6c813356f460b63eb13532fa40d1.jpg" width="200" height="283"/>
              </a>
              <p>我试试少时诵诗书所所所所所所所所所所所少时诵诗书所所所所所所 少时诵诗书所</p>
            </li>
            <li>
              <a href="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=e5127fe0db09b3deffb2ec2ba4d606f4/9d82d158ccbf6c813356f460b63eb13532fa40d1.jpg">
                <img src="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=e5127fe0db09b3deffb2ec2ba4d606f4/9d82d158ccbf6c813356f460b63eb13532fa40d1.jpg" width="200" height="283"/>
              </a>
              <p>1</p>
            </li>
            <li>
              <a href={require("images/full/1.jpg")}>
                <img src={require("images/full/1.jpg")} width="150" height="183"/>
              </a>
              <p>1</p>
            </li>
            <li>
              <a href="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=e5127fe0db09b3deffb2ec2ba4d606f4/9d82d158ccbf6c813356f460b63eb13532fa40d1.jpg">
                <img src="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=e5127fe0db09b3deffb2ec2ba4d606f4/9d82d158ccbf6c813356f460b63eb13532fa40d1.jpg" width="200" height="283"/>
              </a>
              <p>我试试少时诵诗书所所所所所所所所所所所少时诵诗书所所所所所所 少时诵诗书所</p>
            </li>
          </ul>
      </div>
    );
  }
}
export default withRouter(Reading);
